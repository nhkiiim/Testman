package com.henh.testman.results.load_results.response;

import com.henh.testman.results.load_results.LoadResultDto;
import lombok.Getter;

@Getter
public class WorkRes {

    private final LoadResultDto loadResult;

    public WorkRes(LoadResultDto loadResultDto) {
        this.loadResult = loadResultDto;
    }

}
