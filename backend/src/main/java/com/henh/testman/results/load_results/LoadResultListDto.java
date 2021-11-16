package com.henh.testman.results.load_results;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class LoadResultListDto {

    private final Long seq;

    private final ResultSummary resultSummary;

    private final LocalDateTime createAt;

    public LoadResultListDto(LoadResult loadResult) {
        this.seq = loadResult.getSeq();
        this.resultSummary = loadResult.getResultSummary();
        this.createAt = loadResult.getCreateAt();
    }

}
