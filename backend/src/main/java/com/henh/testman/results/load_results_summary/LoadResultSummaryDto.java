package com.henh.testman.results.load_results_summary;

import com.henh.testman.histories.History;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoadResultSummaryDto {

    private History history;

    private String label;

    private Long avgElapsed;

    private Long min;

    private Long max;

    private Double stdDev;

    private Double errorRate;

    private Double throughput;

    private Long receivedPerSec;

    private Long sentPerSec;

    private Long avgBytes;

    public LoadResultSummaryDto(LoadResultSummary loadResultSummary) {
        this.history = loadResultSummary.getHistory();
        this.label = loadResultSummary.getLabel();
        this.avgElapsed = loadResultSummary.getAvgElapsed();
        this.min = loadResultSummary.getMin();
        this.max = loadResultSummary.getMax();
        this.stdDev = loadResultSummary.getStdDev();
        this.errorRate = loadResultSummary.getErrorRate();
        this.throughput = loadResultSummary.getThroughput();
        this.receivedPerSec = loadResultSummary.getReceivedPerSec();
        this.sentPerSec = loadResultSummary.getSentPerSec();
        this.avgBytes = loadResultSummary.getAvgBytes();
    }

}
