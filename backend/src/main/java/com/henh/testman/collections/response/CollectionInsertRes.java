package com.henh.testman.collections.response;

import com.henh.testman.collections.CollectionDto;
import lombok.Getter;

@Getter
public class CollectionInsertRes {

    private final CollectionDto collection;

    public CollectionInsertRes(CollectionDto collectionDto) {
        this.collection = collectionDto;
    }

}
