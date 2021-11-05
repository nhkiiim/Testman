package com.henh.testman.collections.response;

import com.henh.testman.collections.CollectionDto;
import lombok.Getter;

import java.util.List;

@Getter
public class CollectionSelectRes {

    private final List<CollectionDto> collectionList;

    public CollectionSelectRes(List<CollectionDto> collectionDtoList) {
        this.collectionList = collectionDtoList;
    }

}
