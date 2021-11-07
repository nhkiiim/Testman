package com.henh.testman.histories;

import com.henh.testman.results.load_results.request.LoadInsertReq;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDateTime;

@Getter
@Builder
@ToString
@AllArgsConstructor
@RedisHash(value = "history")
public class History {

    @Id
    private Long seq;

    @Indexed
    private Long workspaceSeq;

    private Long tabSeq;

    private String address;

    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

    private LocalDateTime createAt;

    public History(LoadInsertReq loadInsertReq) {
        this.workspaceSeq = loadInsertReq.getWorkspaceSeq();;
        this.tabSeq = loadInsertReq.getTabSeq();
        this.address = loadInsertReq.getAddress();
        this.httpMethod = loadInsertReq.getHttpMethod();
        this.port = loadInsertReq.getPort();
        this.params = loadInsertReq.getParams();
        this.headers = loadInsertReq.getHeaders();
        this.authorization = loadInsertReq.getAuthorization();
        this.createAt = loadInsertReq.getCreateAt();
    }

}
