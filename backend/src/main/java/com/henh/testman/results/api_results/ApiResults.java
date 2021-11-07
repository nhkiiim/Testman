package com.henh.testman.results.api_results;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.util.Map;

@Getter
@Builder
@ToString
@RedisHash(value = "apiResult")
public class ApiResults {

    @Id
    private Long seq;

    @Indexed
    private Long tabSeq;

    private Integer code;

    private Map<String, Object> body;

    private Map<String, String> headers;

}
