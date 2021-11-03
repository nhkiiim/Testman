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

    private Long seq;

    private String title;

    private String url;

    private String description;

}