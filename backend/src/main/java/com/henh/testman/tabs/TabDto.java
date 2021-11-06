package com.henh.testman.tabs;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class TabDto {

    private Long seq;

    private Long workspaceSeq;

    private String address;

    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

    public TabDto(Tab tab) {
        this.seq = tab.getSeq();
        this.workspaceSeq = tab.getWorkspaceSeq();
        this.address = tab.getAddress();
        this.httpMethod = tab.getHttpMethod();
        this.port = tab.getPort();
        this.params = tab.getParams();
        this.headers = tab.getHeaders();
        this.authorization = tab.getAuthorization();
    }

}
