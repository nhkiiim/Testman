package com.henh.testman.tabs;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TabDto {

    private final Long seq;

    private final Long workspaceSeq;

    private final String path;

    private final String httpMethod;

    private final String params;

    private final String headers;

    public TabDto(Tab tab) {
        this.seq = tab.getSeq();
        this.workspaceSeq = tab.getWorkspaceSeq();
        this.path = tab.getPath();
        this.httpMethod = tab.getHttpMethod();
        this.params = tab.getParams();
        this.headers = tab.getHeaders();
    }

}
