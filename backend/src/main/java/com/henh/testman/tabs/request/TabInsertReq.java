package com.henh.testman.tabs.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class TabInsertReq {

    @NotNull(message = "workspaceSeq must be provided")
    private Long workspaceSeq;

}
