package com.henh.testman.results.load_results.response;

import lombok.Getter;

@Getter
public class LoadDeleteRes {

    private final Integer count;

    public LoadDeleteRes(Integer count) {
        this.count = count;
    }

}
