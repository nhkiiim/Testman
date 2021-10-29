package com.henh.testman.results.load_results_raw;

import com.henh.testman.common.utils.BaseEntity;
import com.henh.testman.results.load_results_summary.LoadResultSummary;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalTime;

@Getter
@Setter
@ToString
@RedisHash(value = "loadResultRaw")
public class LoadResultRaw extends BaseEntity {

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

}
