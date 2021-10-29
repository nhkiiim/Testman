package com.henh.testman.results.load_results_raw;

import com.henh.testman.results.load_results_summary.LoadResultSummary;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalTime;

@Getter
@Setter
@ToString
public class LoadResultRawDto {

    private LoadResultSummary loadResultSummary;

    private LocalTime timeStamp;

    private Long elapsed;

    private String label;

    private Integer responseCode;

    private String responseMessage;

    private String threadName;

    private String dateType;

    private String success;

    private String failureMessage;

    private Long bytes;

    private Long sentBytes;

    private Integer grpThreads;

    private Integer allThreads;

    private String url;

    private Long latency;

    private Long idleTime;

    private Long connect;

    public LoadResultRawDto(LoadResultRaw loadResultRaw){
        this.loadResultSummary =  loadResultRaw.getLoadResultSummary();
        this.elapsed = loadResultRaw.getElapsed();
        this.label = loadResultRaw.getLabel();
        this.responseCode = loadResultRaw.getResponseCode();
        this.responseMessage = loadResultRaw.getResponseMessage();
        this.threadName = loadResultRaw.getThreadName();
        this.dateType = loadResultRaw.getDateType();
        this.success = loadResultRaw.getSuccess();
        this.failureMessage = loadResultRaw.getFailureMessage();
        this.bytes = loadResultRaw.getBytes();
        this.sentBytes = loadResultRaw.getSentBytes();
        this.grpThreads = loadResultRaw.getGrpThreads();
        this.allThreads = loadResultRaw.getAllThreads();
        this.url = loadResultRaw.getUrl();
        this.latency = loadResultRaw.getLatency();
        this.idleTime = loadResultRaw.getIdleTime();
        this.connect = loadResultRaw.getConnect();
    }

}
