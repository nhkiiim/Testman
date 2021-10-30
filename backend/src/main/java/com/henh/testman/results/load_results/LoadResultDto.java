package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results_raw.LoadResultRaw;
import com.henh.testman.results.load_results_summary.LoadResultSummary;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class LoadResultDto {

    private LoadResultSummary loadResultSummary;

    private List<LoadResultRaw> loadResultRawList;

    public LoadResultDto(LoadResult loadResult) {
        this.loadResultSummary = loadResult.getLoadResultSummary();
        this.loadResultRawList = loadResult.getLoadResultRawList();
    }

}
