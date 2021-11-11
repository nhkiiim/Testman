package com.henh.testman.results.load_results;

import org.apache.jmeter.reporters.ResultCollector;
import org.apache.jmeter.samplers.SampleEvent;
import org.apache.jmeter.samplers.SampleResult;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class MyResultCollector extends ResultCollector {

    private final Long tabSeq;

    private final LocalDateTime creatAt;

    private final List<ResultRaw> resultRawList;

    private final MySummariser mySummariser;

    public MyResultCollector(Long tabSeq, LocalDateTime createAt) {
        super();
        this.resultRawList = new ArrayList<>();
        this.mySummariser = new MySummariser();
        this.tabSeq = tabSeq;
        this.creatAt = createAt;
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
    }

    public LoadResult getResult() {
        return LoadResult.builder()
                .tabSeq(tabSeq)
                .resultRawList(resultRawList)
                .resultSummary(new ResultSummary(mySummariser))
                .createAt(creatAt)
                .build();
    }

}
