package com.henh.testman.results.load_results.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.Map;

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

    @NotBlank(message = "path must be provided")
    private String path;

    @NotBlank(message = "httpMethod must be provided")
    private String httpMethod;

    @Positive
    @NotNull(message = "loop must be provided")
    private Integer loop;

    @Positive
    @NotNull(message = "thread must be provided")
    private Integer thread;

    private Map<String, Object> body;

    private Map<String, String> headers;

    private final LocalDateTime createAt = LocalDateTime.now();

}
