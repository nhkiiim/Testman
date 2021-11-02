package com.henh.testman.results.load_results.response;

import com.henh.testman.results.load_results.LoadResultDto;
import lombok.Getter;

@Getter
public class WorkResponse {

    private final LoadResultDto loadResult;

    public WorkResponse(LoadResultDto loadResultDto) {
        this.loadResult = loadResultDto;
    }

}
