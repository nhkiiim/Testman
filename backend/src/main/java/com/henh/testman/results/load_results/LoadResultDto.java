package com.henh.testman.results.load_results;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class LoadResultDto {

    private String label;

    private ResultSummary resultSummary;

    private List<ResultRaw> resultRawList;

    public LoadResultDto(LoadResult loadResult) {
        this.label = loadResult.getLabel();
        this.resultSummary = loadResult.getResultSummary();
        this.resultRawList = loadResult.getResultRawList();
    }

}
