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
import org.springframework.core.io.ClassPathResource;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Map;

public class LoadTest {

    private static final String slash = System.getProperty("file.separator");

    private static final ClassPathResource jmeterHome = new ClassPathResource("apache-jmeter-5.4.1");

    private static final ClassPathResource jmeterProperties = new ClassPathResource("apache-jmeter-5.4.1" + slash + "bin" + slash + "jmeter.properties");

    private static void initialization() {
        try {
            Path homePath = Paths.get(jmeterHome.getURI());
            Path propertiesPath = Paths.get(jmeterProperties.getURI());
//            System.out.println(homePath.toString());
//            System.out.println(propertiesPath.toString());

            JMeterUtils.setJMeterHome(homePath.toString());
            JMeterUtils.loadJMeterProperties(propertiesPath.toString());
        } catch (Exception e) {
            throw new FailLoadTestException("fail jmeter init");
        }
        JMeterUtils.initLocale();
    }

    private static HeaderManager makeHeaderManager(Map<String, String> headers) {
        HeaderManager manager = new HeaderManager();

        for (Map.Entry<String, String> entry : headers.entrySet()) {
            manager.add(new Header(entry.getKey(), entry.getValue()));
//            System.out.println(entry.getKey() + " " + entry.getValue());
        }

        manager.setName(JMeterUtils.getResString("header_manager_title")); // $NON-NLS-1$
        manager.setProperty(TestElement.TEST_CLASS, HeaderManager.class.getName());
        manager.setProperty(TestElement.GUI_CLASS, HeaderPanel.class.getName());

        return manager;
    }

    private static HTTPSamplerProxy makeSampler(LoadInsertReq loadInsertReq) {
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

//        System.out.println("protocol : " + protocol);
//        System.out.println("domain : " + domain);
//        System.out.println("port : " + port);
//        System.out.println("path : " + path);
//        System.out.println("http method : " + httpMethod);

        sampler.setProtocol(protocol);
        sampler.setDomain(domain);
        sampler.setPort(port);
        sampler.setPath(path);
        sampler.setMethod(httpMethod);

        sampler.setProperty(TestElement.TEST_CLASS, HTTPSamplerProxy.class.getName());
        sampler.setProperty(TestElement.GUI_CLASS, HttpTestSampleGui.class.getName());

        return sampler;
    }

    private static LoopController makeLoopController(int loop) {
        LoopController loopController = new LoopController();

        loopController.setLoops(loop);
        loopController.setFirst(true);
        loopController.setProperty(TestElement.TEST_CLASS, LoopController.class.getName());
        loopController.setProperty(TestElement.GUI_CLASS, LoopControlPanel.class.getName());
        loopController.initialize();

        return loopController;
    }

    private static ThreadGroup makeThreadGroup(LoopController loopController, int thread) {
        ThreadGroup threadGroup = new ThreadGroup();

        threadGroup.setName("Thread Group");
        threadGroup.setNumThreads(thread);
        threadGroup.setRampUp(1);
        threadGroup.setSamplerController(loopController);
        threadGroup.setProperty(TestElement.TEST_CLASS, ThreadGroup.class.getName());
        threadGroup.setProperty(TestElement.GUI_CLASS, ThreadGroupGui.class.getName());

        return threadGroup;
    }

    private static TestPlan makeTestPlan() {
        TestPlan testPlan = new TestPlan("Create JMeter Script From Java Code");

        testPlan.setProperty(TestElement.TEST_CLASS, TestPlan.class.getName());
        testPlan.setProperty(TestElement.GUI_CLASS, TestPlanGui.class.getName());
        testPlan.setUserDefinedVariables((Arguments) new ArgumentsPanel().createTestElement());

        return testPlan;
    }

    private static HashTree makeTestPlanTree(TestPlan testPlan, ThreadGroup threadGroup, HTTPSamplerProxy Sampler, HeaderManager manager) {
        HashTree testPlanTree = new HashTree();

        testPlanTree.add(testPlan);
        HashTree threadGroupHashTree = testPlanTree.add(testPlan, threadGroup);
        threadGroupHashTree.add(Sampler, manager);

        return testPlanTree;
    }

    private static void makeCollector(HashTree testPlanTree, LoadResultRepository loadResultRepository,
                                      Long tabSeq, LocalDateTime createAt) {
        MyResultCollector logger = new MyResultCollector(loadResultRepository, tabSeq, createAt);

        testPlanTree.add(testPlanTree.getArray()[0], logger);
    }

    private static void run(HashTree testPlanTree) {
        StandardJMeterEngine jmeter = new StandardJMeterEngine();

        jmeter.configure(testPlanTree);
        jmeter.run();

        System.out.println("Test completed.");
    }

    public static void work(LoadInsertReq loadInsertReq, LoadResultRepository loadResultRepository) {
        initialization();
        HeaderManager manager = makeHeaderManager(loadInsertReq.getHeaders());
        HTTPSamplerProxy sampler = makeSampler(loadInsertReq);
        LoopController loopController = makeLoopController(loadInsertReq.getLoop());
        ThreadGroup threadGroup = makeThreadGroup(loopController, loadInsertReq.getThread());
        TestPlan testPlan = makeTestPlan();
        HashTree testPlanTree = makeTestPlanTree(testPlan, threadGroup, sampler, manager);
        makeCollector(testPlanTree, loadResultRepository, loadInsertReq.getTabSeq(), loadInsertReq.getCreateAt());
        run(testPlanTree);
    }

}
