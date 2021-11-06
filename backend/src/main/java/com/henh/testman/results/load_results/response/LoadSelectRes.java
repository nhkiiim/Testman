package com.henh.testman.results.load_results.response;

import com.henh.testman.results.load_results.LoadResult;
import lombok.Getter;

import java.util.List;

@Getter
public class LoadSelectRes {

    private final List<LoadResult> LoadResultList;

    public LoadSelectRes(List<LoadResult> LoadResultList) {
        this.LoadResultList = LoadResultList;
    }

}
