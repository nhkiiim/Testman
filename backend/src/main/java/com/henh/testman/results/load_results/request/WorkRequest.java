package com.henh.testman.results.load_results.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class WorkRequest {

    private String userId;
    
    private String label;

    private String address;

    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

    private Integer loop;

    private Integer thread;

    private final LocalDateTime createAt = LocalDateTime.now();

}
