package com.henh.testman.results.api_results;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ApiResultDto {

    private Long tabSeq;

    private Integer code;

    private String body;

    private String headers;

    public ApiResultDto(ApiResults apiResults) {
        this.tabSeq = apiResults.getTabSeq();
        this.code = apiResults.getCode();
        this.body = apiResults.getBody();
        this.headers = apiResults.getHeaders();
    }

}
