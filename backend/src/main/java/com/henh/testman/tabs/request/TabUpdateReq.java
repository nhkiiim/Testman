package com.henh.testman.tabs.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class TabUpdateReq {

    @NotNull(message = "seq must be provided")
    private Long seq;

    @NotBlank(message = "address must be provided")
    private String address;

    @NotBlank(message = "httpMethod must be provided")
    private String httpMethod;

    @NotNull(message = "port must be provided")
    private Integer port;

    private String params;

    private String headers;

    private String authorization;

}
