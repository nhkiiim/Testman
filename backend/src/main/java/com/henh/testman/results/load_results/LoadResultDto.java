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

    private String userId;

    private String label;

    private ResultSummary resultSummary;

    private List<ResultRaw> resultRawList;

    private LocalDateTime createAt;

    public LoadResultDto(LoadResult loadResult) {
        this.userId = loadResult.getUserId();
        this.label = loadResult.getLabel();
        this.resultSummary = loadResult.getResultSummary();
        this.resultRawList = loadResult.getResultRawList();
        this.createAt = loadResult.getCreateAt();
    }

}
