package com.henh.testman.collections.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class CollectionInsertReq {

    @NotNull(message = "workspaceSeq must be provided")
    private Long workspaceSeq;

    @NotBlank(message = "name must be provided")
    private String name;

}
