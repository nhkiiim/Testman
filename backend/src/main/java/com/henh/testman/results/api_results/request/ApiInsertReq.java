package com.henh.testman.results.api_results.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class ApiInsertReq {

    @NotNull(message = "workspaceSeq must be provided")
    private Long workspaceSeq;

    @NotNull(message = "tabSeq must be provided")
    private Long tabSeq;

    @NotBlank(message = "address must be provided")
    private String address;

    @NotNull(message = "port must be provided")
    private String path;

    @NotBlank(message = "httpMethod must be provided")
    private String httpMethod;

    private String params;

    private String headers;

    private String authorization;

}
