package com.henh.testman.results.api_results;

import com.henh.testman.uri_info.UriInfo;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@ToString
public class ApiResultDto {

    private UriInfo URIInfo;

    private Integer code;

    private Map<String, Object> body;

    private Map<String, String> headers;

    public ApiResultDto(ApiResult apiResult) {
        this.URIInfo = apiResult.getURIInfo();
        this.code = apiResult.getCode();
        this.body = apiResult.getBody();
        this.headers = apiResult.getHeaders();
    }

}
