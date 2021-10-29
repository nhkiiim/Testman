package com.henh.testman.results.api_results;

import com.henh.testman.histories.History;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@ToString
public class ApiResultDto {

    private History history;

    private Integer code;

    private Map<String, Object> body;

    private Map<String, String> headers;

    public ApiResultDto(ApiResult apiResult) {
        this.history = apiResult.getHistory();
        this.code = apiResult.getCode();
        this.body = apiResult.getBody();
        this.headers = apiResult.getHeaders();
    }

}
