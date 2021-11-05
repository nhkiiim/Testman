package com.henh.testman.collections.response;

import lombok.Getter;

@Getter
public class CollectionDeleteRes {

    private final String name;

    public CollectionDeleteRes(String name) {
        this.name = name;
    }

}
