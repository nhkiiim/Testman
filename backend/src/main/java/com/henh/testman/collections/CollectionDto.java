package com.henh.testman.collections;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CollectionDto {

    private Long workspaceSeq;

    private String name;

    CollectionDto(Collection collection) {
        this.workspaceSeq = collection.getWorkspaceSeq();
        this.name = collection.getName();
    }

}
