package com.henh.testman.collections;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CollectionDto {

    private final Long seq;

    private final Long workspaceSeq;

    private final String name;

    CollectionDto(Collection collection) {
        this.seq = collection.getSeq();
        this.workspaceSeq = collection.getWorkspaceSeq();
        this.name = collection.getName();
    }

}
