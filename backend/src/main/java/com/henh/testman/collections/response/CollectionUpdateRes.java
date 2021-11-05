package com.henh.testman.collections.response;

import com.henh.testman.collections.CollectionDto;
import lombok.Getter;

@Getter
public class CollectionUpdateRes {

    private final CollectionDto collection;

    public CollectionUpdateRes(CollectionDto collectionDto) {
        this.collection = collectionDto;
    }

}
