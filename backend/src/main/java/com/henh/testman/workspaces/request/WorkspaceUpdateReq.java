package com.henh.testman.workspaces.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class WorkspaceUpdateReq {

    @NotNull(message = "seq must be provided")
    private Long seq;

    private String title;

    private String url;

    private String description;

}