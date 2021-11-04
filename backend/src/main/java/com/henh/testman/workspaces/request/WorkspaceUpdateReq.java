package com.henh.testman.workspaces.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class WorkspaceUpdateReq {

    private final Long seq;

    private final String title;

    private final String url;

    private final String description;

}