package com.henh.testman.tabs.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.util.Map;

@Getter
@Setter
@ToString
public class TabUpdateReq {

    @NotNull(message = "seq must be provided")
    private Long seq;

    private Long collectionSeq;

    private String address;

    private String path;

    private String httpMethod;

    private Map<String, Object> params;

    private Map<String, String> headers;

}
