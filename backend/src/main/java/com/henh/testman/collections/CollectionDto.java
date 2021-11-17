package com.henh.testman.collections;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CollectionDto {

    private final Long seq;

    private final Long tabSeq;

    private final String name;

    CollectionDto(Collection collection) {
        this.seq = collection.getSeq();
        this.tabSeq = collection.getWorkspaceSeq();
        this.name = collection.getName();
    }

}
