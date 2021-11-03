package com.henh.testman.results.load_results;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
@RedisHash(value = "loadResult")
public class LoadResult {

    @Id
    private final Long id;

    @Indexed
    private final String userId;

    @Indexed
    private final Long historySeq;

    private final List<ResultRaw> resultRawList;

    private final ResultSummary resultSummary;

    @Indexed
    private final LocalDateTime createAt;

}
