package com.henh.testman.results.load_results.response;

import com.henh.testman.results.load_results.LoadResult;
import lombok.Getter;

import java.util.List;

@Getter
public class LoadGetRes {

    private final List<LoadResult> LoadResultList;

    public LoadGetRes(List<LoadResult> LoadResultList) {
        this.LoadResultList = LoadResultList;
    }

}
