package com.henh.testman.histories;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class HistoryDto {

    private final Long seq;

    private final Long workspaceSeq;

    private final String address;

    private final String httpMethod;

    private final Integer port;

    private final String params;

    private final String headers;

    private final String authorization;

    private final LocalDateTime creatDate;

    public HistoryDto(History history) {
        this.seq = history.getSeq();
        this.workspaceSeq = history.getWorkspaceSeq();
        this.address = history.getAddress();
        this.httpMethod = history.getHttpMethod();
        this.port = history.getPort();
        this.params = history.getParams();
        this.headers = history.getHeaders();
        this.authorization = history.getAuthorization();
        this.creatDate = history.getCreatDate();
    }

}
