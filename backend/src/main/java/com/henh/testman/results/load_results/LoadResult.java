package com.henh.testman.results.load_results;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
@RedisHash(value = "loadResult")
public class LoadResult {

    @Id
    private final Long seq;

    private final String userId;

    private final String label;

    private final List<ResultRaw> resultRawList;

    private final ResultSummary resultSummary;

    private final LocalDateTime createAt;

}
