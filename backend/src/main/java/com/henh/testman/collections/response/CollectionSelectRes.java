package com.henh.testman.collections.response;

import com.henh.testman.collections.CollectionDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CollectionSelectRes {

    private final List<CollectionDto> collectionList;

}
