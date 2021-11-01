package com.henh.testman.results.load_results.request;

import lombok.*;

@Getter
@Setter
@ToString
public class WorkRequest {

    private String userId;
    
    // 타임스탬프

    private String label;

    private String address;

    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

    private Integer loop;

    private Integer thread;

}
