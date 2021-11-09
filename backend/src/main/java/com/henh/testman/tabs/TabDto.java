package com.henh.testman.tabs;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.henh.testman.common.errors.InvalidMapperException;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@ToString
public class TabDto {

    private final Long seq;

    private final Long workspaceSeq;

    private final String address;

    private final String path;

    private final String httpMethod;

    private final Map<?, ?> params;

    private final Map<?, ?> headers;

    public TabDto(Tab tab) {
        ObjectMapper mapper = new ObjectMapper();

        this.seq = tab.getSeq();
        this.workspaceSeq = tab.getWorkspaceSeq();
        this.address = tab.getAddress();
        this.path = tab.getPath();
        this.httpMethod = tab.getHttpMethod();

        try {
            this.params = mapper.readValue(tab.getParams(), Map.class);
            this.headers = mapper.readValue(tab.getHeaders(), Map.class);
        } catch (JsonProcessingException e) {
            throw new InvalidMapperException("Mapping failed");
        }
    }

}
