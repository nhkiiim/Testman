package com.henh.testman.results.load_results;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.apache.jmeter.samplers.SampleResult;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.TimeZone;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ResultRaw {

    private String dateTime;

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
        this.dateTime = LocalDateTime.ofInstant(
                Instant.ofEpochMilli(result.getTimeStamp()),
                TimeZone.getDefault().toZoneId()
        ).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.elapsed = result.getTime();
        this.responseCode = result.getResponseCode();
        this.responseMessage = result.getResponseMessage();
        this.threadName = result.getThreadName().substring(result.getThreadName().length()-1);
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
