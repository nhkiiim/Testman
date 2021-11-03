package com.henh.testman.results.load_results;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ResultSummary {

    private Long numSamples;

    private Long avgElapsed;

    private Long min;

    private Long max;

    private Long errorCount;

    private String errorRate;

    private Double throughput;

    private String receivedPerSec;

    private String sentPerSec;

    public ResultSummary(MySummariser mySummariser) {
        this.numSamples = mySummariser.getNumSamples();
        this.avgElapsed = mySummariser.getAverage();
        this.min = mySummariser.getMin();
        this.max = mySummariser.getMax();
        this.errorCount = mySummariser.getErrorCount();
        this.errorRate = mySummariser.getErrorPercentageString();
        this.throughput = mySummariser.getRate();
        this.receivedPerSec = mySummariser.getReceivePerSec();
        this.sentPerSec = mySummariser.getSentPerSec();
    }

}
