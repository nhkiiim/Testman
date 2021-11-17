package com.henh.testman.histories;

import com.henh.testman.results.api_results.request.ApiInsertReq;
import com.henh.testman.results.load_results.request.LoadInsertReq;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "history", timeToLive = 1296000)
public class History {

    @Id
    private Long seq;

    @Indexed
    private Long workspaceSeq;

    private Long tabSeq;

    private String address;

    private String path;

    private String httpMethod;

    private Map<String, Object> body;

    private Map<String, String> headers;

    private LocalDateTime createAt;

    public History(LoadInsertReq loadInsertReq) {
        this.workspaceSeq = loadInsertReq.getWorkspaceSeq();
        this.tabSeq = loadInsertReq.getTabSeq();
        this.address = loadInsertReq.getAddress();
        this.path = loadInsertReq.getPath();
        this.httpMethod = loadInsertReq.getHttpMethod();
        this.body = loadInsertReq.getBody();
        this.headers = loadInsertReq.getHeaders();
        this.createAt = loadInsertReq.getCreateAt();
    }

    public History(ApiInsertReq apiInsertReqReq) {
        this.workspaceSeq = apiInsertReqReq.getWorkspaceSeq();
        this.tabSeq = apiInsertReqReq.getTabSeq();
        this.address = apiInsertReqReq.getAddress();
        this.path = apiInsertReqReq.getPath();
        this.httpMethod = apiInsertReqReq.getHttpMethod();
        this.body = apiInsertReqReq.getBody();
        this.headers = apiInsertReqReq.getHeaders();
        this.createAt = LocalDateTime.now();
    }

}
