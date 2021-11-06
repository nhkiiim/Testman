package com.henh.testman.results.load_results;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
public class LoadResultDto {

    private final Long seq;

    private final String userId;

    private final Long uriInfoSeq;

    private final ResultSummary resultSummary;

    private final List<ResultRaw> resultRawList;

    private final LocalDateTime createAt;

    public LoadResultDto(LoadResult loadResult) {
        this.seq = loadResult.getId();
        this.userId = loadResult.getUserId();
        this.uriInfoSeq = loadResult.getUriInfoSeq();
        this.resultSummary = loadResult.getResultSummary();
        this.resultRawList = loadResult.getResultRawList();
        this.createAt = loadResult.getCreateAt();
    }

}
