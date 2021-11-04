package com.henh.testman.uri_info.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@ToString
@AllArgsConstructor
public class UriInfoRegistReq {

    @NotBlank(message = "workspace_seq must be provided")
    private Long workspace_seq;

    private Long collection_seq;

    @NotBlank(message = "path must be provided")
    private String path;

    @NotBlank(message = "httpMethod must be provided")
    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

}
