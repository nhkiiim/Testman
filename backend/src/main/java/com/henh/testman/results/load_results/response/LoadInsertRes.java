package com.henh.testman.results.load_results.response;

import com.henh.testman.results.load_results.LoadResultDto;
import lombok.Getter;

@Getter
public class LoadInsertRes {

    private final LoadResultDto loadResult;

    public LoadInsertRes(LoadResultDto loadResultDto) {
        this.loadResult = loadResultDto;
    }

}
