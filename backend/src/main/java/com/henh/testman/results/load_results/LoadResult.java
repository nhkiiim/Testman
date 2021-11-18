package com.henh.testman.results.load_results;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@RedisHash(value = "loadResult", timeToLive = 86400)
public class LoadResult {

    @Id
    private Long seq;

    @Indexed
    private Long tabSeq;

    private Integer loop;

    private Integer thread;

    private List<ResultRaw> resultRawList;

    private ResultSummary resultSummary;

    private final LocalDateTime createAt;

}
