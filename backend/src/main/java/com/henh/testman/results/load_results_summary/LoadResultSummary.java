package com.henh.testman.results.load_results_summary;

import com.henh.testman.histories.History;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Builder
@ToString
@RedisHash(value = "loadResultSummary")
public class LoadResultSummary {

    @Id
    private Long seq;

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

}
