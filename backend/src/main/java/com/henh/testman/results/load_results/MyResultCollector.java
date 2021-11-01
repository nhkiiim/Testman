package com.henh.testman.results.load_results;

import org.apache.jmeter.reporters.ResultCollector;
import org.apache.jmeter.reporters.Summariser;
import org.apache.jmeter.samplers.SampleEvent;
import org.apache.jmeter.samplers.SampleResult;

import java.util.ArrayList;
import java.util.List;

public class MyResultCollector extends ResultCollector {

    private final LoadResultRepository loadResultRepository;

    private final String userId;

    private final String label;

    private final List<ResultRaw> resultRawList = new ArrayList<>();

    private final MySummariser mySummariser = new MySummariser();

    public MyResultCollector(Summariser summariser, LoadResultRepository loadResultRepository, String userId, String label) {
        super(summariser);
        this.loadResultRepository = loadResultRepository;
        this.userId = userId;
        this.label = label;
    }

    @Override
    public void sampleOccurred(SampleEvent sampleEvent) {
        super.sampleOccurred(sampleEvent);
        SampleResult result = sampleEvent.getResult();

        mySummariser.addSample(result);

        if (result.isSuccessful()) {
            ResultRaw raw = new ResultRaw(result);
            resultRawList.add(raw);
        }
    }

    @Override
    public void testStarted() {
        super.testStarted();
        mySummariser.clear();
    }

    @Override
    public void testEnded() {
        super.testEnded();
        mySummariser.setEndTime();

        ResultSummary resultSummary = new ResultSummary(mySummariser);

        for (ResultRaw raw : resultRawList) {
            System.out.println(raw.toString());
        }
        System.out.println(resultSummary.toString());

        loadResultRepository.save(
                LoadResult.builder()
                        .userId(userId)
                        .label(label)
                        .resultRawList(resultRawList)
                        .resultSummary(resultSummary)
                        .build()
        );
    }

}
