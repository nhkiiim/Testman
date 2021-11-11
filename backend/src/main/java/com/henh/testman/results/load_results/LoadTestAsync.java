package com.henh.testman.results.load_results;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.henh.testman.common.errors.FailLoadTestException;
import com.henh.testman.common.errors.InvalidMapperException;
import com.henh.testman.results.load_results.request.LoadInsertReq;
import org.apache.jmeter.config.Arguments;
import org.apache.jmeter.config.gui.ArgumentsPanel;
import org.apache.jmeter.control.LoopController;
import org.apache.jmeter.control.gui.LoopControlPanel;
import org.apache.jmeter.control.gui.TestPlanGui;
import org.apache.jmeter.engine.StandardJMeterEngine;
import org.apache.jmeter.protocol.http.control.Header;
import org.apache.jmeter.protocol.http.control.HeaderManager;
import org.apache.jmeter.protocol.http.control.gui.HttpTestSampleGui;
import org.apache.jmeter.protocol.http.gui.HeaderPanel;
import org.apache.jmeter.protocol.http.sampler.HTTPSamplerProxy;
import org.apache.jmeter.testelement.TestElement;
import org.apache.jmeter.testelement.TestPlan;
import org.apache.jmeter.threads.ThreadGroup;
import org.apache.jmeter.threads.gui.ThreadGroupGui;
import org.apache.jmeter.util.JMeterUtils;
import org.apache.jorphan.collections.HashTree;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.nio.file.Paths;
import java.util.Map;
import java.util.concurrent.Future;

@Service
public class LoadTestAsync {

    private static final Logger logger = LoggerFactory.getLogger(LoadTestAsync.class);

    private static final String slash = System.getProperty("file.separator");

    private static final ClassPathResource jmeterHome = new ClassPathResource("apache-jmeter-5.4.1");

    private static final ClassPathResource jmeterProperties = new ClassPathResource("apache-jmeter-5.4.1" + slash + "bin" + slash + "jmeter.properties");

    @Async
    public Future<LoadResult> work(LoadInsertReq loadInsertReq) {
        /* initialization */
        try {
            JMeterUtils.setJMeterHome(Paths.get(jmeterHome.getURI()).toString());
            JMeterUtils.loadJMeterProperties(Paths.get(jmeterProperties.getURI()).toString());
        } catch (Exception e) {
            throw new FailLoadTestException("fail jmeter init");
        }
        JMeterUtils.initLocale();

        /* makeHeaderManager */
        HeaderManager manager = new HeaderManager();
        Map<String, String> headers = loadInsertReq.getHeaders();

        for (Map.Entry<String, String> entry : headers.entrySet()) {
            manager.add(new Header(entry.getKey(), entry.getValue()));
        }

        manager.setName(JMeterUtils.getResString("header_manager_title")); // $NON-NLS-1$
        manager.setProperty(TestElement.TEST_CLASS, HeaderManager.class.getName());
        manager.setProperty(TestElement.GUI_CLASS, HeaderPanel.class.getName());

        /* makeSampler */
        HTTPSamplerProxy sampler = new HTTPSamplerProxy();

        // address parsing
        String[] part = loadInsertReq.getAddress().replaceAll("//", "").split(":");

        String protocol = part[0];
        String domain = part[1];
        int port = part.length == 3 ? Integer.parseInt(part[2]) : 80;
        // address parsing end

        // path parsing, query string
        String[] paths = loadInsertReq.getPath().split("\\?");

        String path = paths[0];
        if (paths.length > 1) {
            String[] queryString = paths[1].split("&");

            for (String query : queryString) {
                String[] entry = query.split("=");
                sampler.addArgument(entry[0], entry[1]);
            }
        }
        // query string end

        // body
        String httpMethod = loadInsertReq.getHttpMethod();
        if (httpMethod.equals("POST") || httpMethod.equals("PATCH")) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                String body = mapper.writeValueAsString(loadInsertReq.getParams());
                sampler.addNonEncodedArgument("body", body, "");
                sampler.setPostBodyRaw(true);
            } catch (JsonProcessingException e) {
                throw new InvalidMapperException("Mapping failed");
            }
        }
        // body end

        sampler.setProtocol(protocol);
        sampler.setDomain(domain);
        sampler.setPort(port);
        sampler.setPath(path);
        sampler.setMethod(httpMethod);

        sampler.setProperty(TestElement.TEST_CLASS, HTTPSamplerProxy.class.getName());
        sampler.setProperty(TestElement.GUI_CLASS, HttpTestSampleGui.class.getName());

        /* makeLoopController */
        LoopController loopController = new LoopController();

        loopController.setLoops(loadInsertReq.getLoop());
        loopController.setFirst(true);
        loopController.setProperty(TestElement.TEST_CLASS, LoopController.class.getName());
        loopController.setProperty(TestElement.GUI_CLASS, LoopControlPanel.class.getName());
        loopController.initialize();

        /* makeThreadGroup */
        ThreadGroup threadGroup = new ThreadGroup();

        threadGroup.setName("Thread Group");
        threadGroup.setNumThreads(loadInsertReq.getThread());
        threadGroup.setRampUp(1);
        threadGroup.setSamplerController(loopController);
        threadGroup.setProperty(TestElement.TEST_CLASS, ThreadGroup.class.getName());
        threadGroup.setProperty(TestElement.GUI_CLASS, ThreadGroupGui.class.getName());

        /* makeTestPlan */
        TestPlan testPlan = new TestPlan("Create JMeter Script From Java Code");

        testPlan.setProperty(TestElement.TEST_CLASS, TestPlan.class.getName());
        testPlan.setProperty(TestElement.GUI_CLASS, TestPlanGui.class.getName());
        testPlan.setUserDefinedVariables((Arguments) new ArgumentsPanel().createTestElement());

        /* makeTestPlanTree */
        HashTree testPlanTree = new HashTree();

        testPlanTree.add(testPlan);
        HashTree threadGroupHashTree = testPlanTree.add(testPlan, threadGroup);
        threadGroupHashTree.add(sampler, manager);

        /* makeCollector */
        MyResultCollector collector = new MyResultCollector(
                loadInsertReq.getTabSeq(),
                loadInsertReq.getCreateAt()
        );

        testPlanTree.add(testPlanTree.getArray()[0], collector);

        /* run */
        StandardJMeterEngine jmeter = new StandardJMeterEngine();

        jmeter.configure(testPlanTree);
        jmeter.run();

        LoadResult result = collector.getResult();
        logger.info(result.getResultSummary().toString());

        return new AsyncResult<>(result);
    }

}