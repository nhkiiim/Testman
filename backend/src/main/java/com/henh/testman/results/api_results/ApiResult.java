package com.henh.testman.results.api_results;

import com.henh.testman.uri_info.UriInfo;
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
public class ApiResult {

    @Id
    private Long seq;

    @Indexed
    private Long uriInfoSeq;

    private Integer code;

    private Map<String, Object> body;

    private Map<String, String> headers;

}
