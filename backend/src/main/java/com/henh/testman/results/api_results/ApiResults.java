package com.henh.testman.results.api_results;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Setter
@ToString
@RedisHash(value = "apiResult")
public class ApiResults {

    @Id
    private Long seq;

    private Long tabSeq;

    private Integer code;

    private String body;

    private String header;

    public void update(Long tabSeq, Integer code, String body, String header){
        this.tabSeq = tabSeq;
        this.code = code;
        this.body = body;
        this.header = header;
    }
}
