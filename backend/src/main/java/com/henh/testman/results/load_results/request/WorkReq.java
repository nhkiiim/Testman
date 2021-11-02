package com.henh.testman.results.load_results.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class WorkReq {

    @NotBlank(message = "userId must be provided")
    private String userId;

    @NotBlank(message = "label must be provided")
    private String label;

    @NotBlank(message = "address must be provided")
    private String address;

    @NotBlank(message = "httpMethod must be provided")
    private String httpMethod;

    @NotBlank(message = "port must be provided")
    private Integer port;

    @NotBlank(message = "loop must be provided")
    private Integer loop;

    @NotBlank(message = "thread must be provided")
    private Integer thread;

    private String params;

    private String headers;

    private String authorization;

    private final LocalDateTime createAt = LocalDateTime.now();

}
