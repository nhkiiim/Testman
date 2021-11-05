package com.henh.testman.uri_info.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@ToString
@AllArgsConstructor
public class UriInfoInsertReq {

    @Positive
    @NotNull(message = "workspace_seq must be provided")
    private final Long workspaceSeq;

    private final Long collectionSeq;

    @NotBlank(message = "path must be provided")
    private final String path;

    @NotBlank(message = "httpMethod must be provided")
    private final String httpMethod;

    @Positive
    private final Integer port;

    private final String params;

    private final String headers;

    private final String authorization;

}
