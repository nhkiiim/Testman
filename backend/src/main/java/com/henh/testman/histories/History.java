package com.henh.testman.histories;

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
    private final Long seq;

    @Indexed
    private final Long workspaceSeq;

    private final String address;

    private final String httpMethod;

    private final Integer port;

    private final String params;

    private final String headers;

    private final String authorization;

    private final LocalDateTime creatDate;

}
