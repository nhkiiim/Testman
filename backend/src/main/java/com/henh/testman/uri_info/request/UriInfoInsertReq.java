package com.henh.testman.uri_info.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@ToString
@AllArgsConstructor
public class UriInfoInsertReq {

    @NotBlank(message = "workspace_seq must be provided")
    private final Long workspace_seq;

    private final Long collection_seq;

    @NotBlank(message = "path must be provided")
    private final String path;

    @NotBlank(message = "httpMethod must be provided")
    private final String httpMethod;

    private final Integer port;

    private final String params;

    private final String headers;

    private final String authorization;

}
