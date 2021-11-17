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

    private final Long collectionSeq;

    private final String address;

    private final String path;

    private final String httpMethod;

    private final Map<?, ?> body;

    private final Map<?, ?> headers;

    public TabDto(Tab tab) {
        ObjectMapper mapper = new ObjectMapper();

        this.seq = tab.getSeq();
        this.workspaceSeq = tab.getWorkspaceSeq();
        this.collectionSeq = tab.getCollectionSeq();
        this.address = tab.getAddress();
        this.path = tab.getPath();
        this.httpMethod = tab.getHttpMethod();

        try {
            this.body = tab.getBody() != null ? mapper.readValue(tab.getBody(), Map.class) : null;
            this.headers = tab.getHeaders() != null ? mapper.readValue(tab.getHeaders(), Map.class) : null;
        } catch (JsonProcessingException e) {
            throw new InvalidMapperException("Mapping failed");
        }
    }

}
