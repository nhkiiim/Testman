package com.henh.testman.results.load_results.request;

import lombok.*;

@Getter
@Setter
@ToString
public class WorkRequest {

    private String label;

    private String path;

    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

    private Integer loop;

    private Integer thread;

}
