package com.henh.testman.histories.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@ToString
@AllArgsConstructor
public class HistoryRegistReq {

    @NotBlank(message = "workspace_seq must be provided")
    private Long workspace_seq;

    @NotBlank(message = "path must be provided")
    private String path;

    @NotBlank(message = "httpMethod must be provided")
    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

}
