package com.henh.testman.results.load_results;

import lombok.*;
import org.apache.jmeter.samplers.SampleResult;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ResultRaw {

    private Long timeStamp;

    private Long elapsed;

    private String responseCode;

    private String responseMessage;

    private String threadName;

    private String dataType;

    private Boolean success;

    private String failureMessage;

    private Long bytes;

    private Long sentBytes;

    private Integer grpThreads;

    private Integer allThreads;

    private String url;

    private Long latency;

    private Long idleTime;

    private Long connect;

    public ResultRaw(SampleResult result) {
        this.timeStamp = result.getTimeStamp();
        this.elapsed = result.getTime();
        this.responseCode = result.getResponseCode();
        this.responseMessage = result.getResponseMessage();
        this.threadName = result.getThreadName();
        this.dataType = result.getDataType();
        this.success = result.isSuccessful();
        this.failureMessage = result.getFirstAssertionFailureMessage();
        this.bytes = result.getBytesAsLong();
        this.sentBytes = result.getSentBytes();
        this.grpThreads = result.getGroupThreads();
        this.allThreads = result.getAllThreads();
        this.url = result.getUrlAsString();
        this.latency = result.getLatency();
        this.idleTime = result.getIdleTime();
        this.connect = result.getConnectTime();
    }

}
