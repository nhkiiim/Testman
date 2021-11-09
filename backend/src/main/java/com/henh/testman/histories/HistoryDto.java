package com.henh.testman.histories;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@ToString
public class HistoryDto {

    private final Long seq;

    private final Long workspaceSeq;

    private final Long tabSeq;

    private final String address;

    private final String path;

    private final String httpMethod;

    private final Map<String, Object> params;

    private final Map<String, String> headers;

    private final LocalDateTime createAt;

    public HistoryDto(History history) {
        this.seq = history.getSeq();
        this.workspaceSeq = history.getWorkspaceSeq();
        this.tabSeq = history.getTabSeq();
        this.address = history.getAddress();
        this.path = history.getPath();
        this.httpMethod = history.getHttpMethod();
        this.params = history.getParams();
        this.headers = history.getHeaders();
        this.createAt = history.getCreateAt();
    }

}
