package com.henh.testman.results.load_results;

import org.apache.jmeter.reporters.ResultCollector;
import org.apache.jmeter.reporters.Summariser;
import org.apache.jmeter.samplers.SampleEvent;
import org.apache.jmeter.samplers.SampleResult;

public class MyResultCollector extends ResultCollector {

    public MyResultCollector(Summariser summariser) {
        super(summariser);
    }

    @Override
    public void sampleOccurred(SampleEvent sampleEvent) {
        super.sampleOccurred(sampleEvent);
        SampleResult result = sampleEvent.getResult();
        if (result.isSuccessful()) {
            System.out.println("response : " + result);
        }
    }

}
