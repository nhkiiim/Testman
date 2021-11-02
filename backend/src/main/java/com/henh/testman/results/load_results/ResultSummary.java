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

    public ResultSummary(MySummariser summariser) {
        this.numSamples = summariser.getNumSamples();
        this.avgElapsed = summariser.getAverage();
        this.min = summariser.getMin();
        this.max = summariser.getMax();
        this.errorCount = summariser.getErrorCount();
        this.errorRate = summariser.getErrorPercentageString();
        this.throughput = summariser.getRate();
        this.receivedPerSec = summariser.getReceivePerSec();
        this.sentPerSec = summariser.getSentPerSec();
    }

}
