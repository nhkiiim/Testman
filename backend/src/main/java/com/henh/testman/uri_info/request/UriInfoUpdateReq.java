package com.henh.testman.uri_info.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@ToString
@AllArgsConstructor
public class UriInfoUpdateReq {

    @NotBlank(message = "seq must be provided")
    private final Long seq;

    private final Long collectionSeq;

    @NotBlank(message = "path must be provided")
    private final String path;

    @NotBlank(message = "httpMethod must be provided")
    private final String httpMethod;

    private final Integer port;

    private final String params;

    private final String headers;

    private final String authorization;

}
