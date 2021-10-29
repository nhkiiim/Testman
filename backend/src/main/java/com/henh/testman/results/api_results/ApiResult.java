package com.henh.testman.results.api_results;

import com.henh.testman.common.utils.BaseEntity;
import com.henh.testman.histories.History;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class ApiResult extends BaseEntity {

    private History history;

    private Integer code;

    private Map<String, Object> body;

    private Map<String, Object> header;

}
