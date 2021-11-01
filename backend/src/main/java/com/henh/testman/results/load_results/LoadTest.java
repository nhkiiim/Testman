package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results.request.WorkRequest;
import org.apache.jmeter.config.Arguments;
import org.apache.jmeter.config.gui.ArgumentsPanel;
import org.apache.jmeter.control.LoopController;
import org.apache.jmeter.control.gui.LoopControlPanel;
import org.apache.jmeter.control.gui.TestPlanGui;
import org.apache.jmeter.engine.StandardJMeterEngine;
import org.apache.jmeter.protocol.http.control.gui.HttpTestSampleGui;
import org.apache.jmeter.protocol.http.sampler.HTTPSamplerProxy;
import org.apache.jmeter.reporters.Summariser;
import org.apache.jmeter.testelement.TestElement;
import org.apache.jmeter.testelement.TestPlan;
import org.apache.jmeter.threads.ThreadGroup;
import org.apache.jmeter.threads.gui.ThreadGroupGui;
import org.apache.jmeter.util.JMeterUtils;
import org.apache.jorphan.collections.HashTree;

import java.io.File;
import java.util.Optional;

public class LoadTest {

    private static final String slash = System.getProperty("file.separator");;

    private static final File jmeterHome = new File("C:/Users/multicampus/Downloads/apache-jmeter-5.4.1");

    private static final File jmeterProperties  = new File(jmeterHome.getPath() + slash + "bin" + slash + "jmeter.properties");

    private static final String summariserName = JMeterUtils.getPropDefault("summariser.name", "summary");


    private static void initialization() {
        JMeterUtils.setJMeterHome(jmeterHome.getPath());
        JMeterUtils.loadJMeterProperties(jmeterProperties.getPath());
        JMeterUtils.initLocale();
    }

    private static HTTPSamplerProxy makeSampler(int port, String httpMethod, String label) {
        HTTPSamplerProxy Sampler = new HTTPSamplerProxy();

        Sampler.setDomain("example.com");
        Sampler.setPort(port);
        Sampler.setPath("/");
        Sampler.setMethod(httpMethod);
        Sampler.setName(label);
        Sampler.setProperty(TestElement.TEST_CLASS, HTTPSamplerProxy.class.getName());
        Sampler.setProperty(TestElement.GUI_CLASS, HttpTestSampleGui.class.getName());

        return Sampler;
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

        threadGroup.setName("Example Thread Group");
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

    private static HashTree makeTestPlanTree(TestPlan testPlan, ThreadGroup threadGroup, HTTPSamplerProxy Sampler) {
        HashTree testPlanTree = new HashTree();

        testPlanTree.add(testPlan);
        HashTree threadGroupHashTree = testPlanTree.add(testPlan, threadGroup);
        threadGroupHashTree.add(Sampler);

        return testPlanTree;
    }

    private static void makeCollector(HashTree testPlanTree) {
        // add Summarizer output to get test progress in stdout like:
        Summariser summer = new Summariser(summariserName);

        // Store execution results into a .jtl file
//        String logFile = jmeterHome + slash + "example.jtl";
        MyResultCollector logger = new MyResultCollector(summer);
//        logger.setFilename(logFile);
        testPlanTree.add(testPlanTree.getArray()[0], logger);
    }

    private static void run(HashTree testPlanTree) {
        StandardJMeterEngine jmeter = new StandardJMeterEngine();

        jmeter.configure(testPlanTree);
        jmeter.run();


        System.out.println("Test completed. See " + jmeterHome + slash + "example.jtl file for results");
        System.out.println("JMeter .jmx script is available at " + jmeterHome + slash + "example.jmx");
    }

    public static Optional<LoadResult> work(WorkRequest workRequest) {
        initialization();
        HTTPSamplerProxy sampler = makeSampler(workRequest.getPort(), workRequest.getHttpMethod(), workRequest.getLabel());
        LoopController loopController = makeLoopController(workRequest.getLoop());
        ThreadGroup threadGroup = makeThreadGroup(loopController, workRequest.getThread());
        TestPlan testPlan = makeTestPlan();
        HashTree testPlanTree = makeTestPlanTree(testPlan, threadGroup, sampler);
        makeCollector(testPlanTree);
        run(testPlanTree);

        return Optional.empty();
    }

}
