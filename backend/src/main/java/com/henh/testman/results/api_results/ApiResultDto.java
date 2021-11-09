package com.henh.testman.results.api_results;

import com.henh.testman.tabs.Tab;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@ToString
public class ApiResultDto {

    private Tab Tab;

    private Integer code;

    private Map<String, Object> body;

    private Map<String, String> headers;

    public ApiResultDto(ApiResult apiResult) {
        this.Tab = apiResult.getTab();
        this.code = apiResult.getCode();
        this.body = apiResult.getBody();
        this.headers = apiResult.getHeaders();
    }

}
