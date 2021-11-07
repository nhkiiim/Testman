package com.henh.testman.results.load_results.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class LoadInsertReq {

    @NotNull(message = "workspaceSeq must be provided")
    private Long workspaceSeq;

    @NotNull(message = "tabSeq must be provided")
    private Long tabSeq;

    @NotBlank(message = "address must be provided")
    private String address;

    @NotBlank(message = "httpMethod must be provided")
    private String httpMethod;

    @Positive
    @NotNull(message = "port must be provided")
    private Integer port;

    @Positive
    @NotNull(message = "loop must be provided")
    private Integer loop;

    @Positive
    @NotNull(message = "thread must be provided")
    private Integer thread;

    private String params;

    private String headers;

    private String authorization;

    private final LocalDateTime createAt = LocalDateTime.now();

}
