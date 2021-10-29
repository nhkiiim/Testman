package com.henh.testman.results.api_results;

import com.henh.testman.histories.History;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.util.Map;

@Getter
@Setter
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

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("history", history)
                .append("code", code)
                .append("body", body)
                .append("headers", headers)
                .toString();
    }

}
