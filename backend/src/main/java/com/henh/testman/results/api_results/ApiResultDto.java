package com.henh.testman.results.api_results;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@ToString
public class ApiResultDto {

    private long tabSeq;

    private Integer code;

    private Map<String, Object> body;

    private Map<String, String> headers;

    public ApiResultDto(ApiResults apiResults) {
        this.tabSeq = apiResults.getTabSeq();
        this.code = apiResults.getCode();
        this.body = apiResults.getBody();
        this.headers = apiResults.getHeaders();
    }

}
