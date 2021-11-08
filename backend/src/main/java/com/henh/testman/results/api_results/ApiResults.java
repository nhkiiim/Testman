package com.henh.testman.results.api_results;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.util.Map;

@Getter
@ToString
@RedisHash(value = "apiResult")
@NoArgsConstructor
public class ApiResults {

    @Id
    private Long seq;

    @Indexed
    private Long tabSeq;

    private Integer code;

    private Map<String, Object> body;

    private Map<String, String> headers;

    public void update(Long tabSeq, Integer code, Map<String, Object> body, Map<String, String> headers) {
        this.tabSeq = tabSeq;
        this.code = code;
        this.body = body;
        this.headers = headers;
    }
}
