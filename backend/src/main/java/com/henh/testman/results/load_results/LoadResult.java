package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results_raw.LoadResultRaw;
import com.henh.testman.results.load_results_summary.LoadResultSummary;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Getter
@Builder
@ToString
@RedisHash(value = "loadResult")
public class LoadResult {

    @Id
    private Long seq;

    private LoadResultSummary loadResultSummary;

    private List<LoadResultRaw> loadResultRawList;

}
