package com.henh.testman.tabs;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.henh.testman.common.errors.InvaildMapperException;
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

<<<<<<< HEAD
    private final String params;

    private final String headers;
=======
    private final Map<?, ?> params;

    private final Map<?, ?> headers;
>>>>>>> 59f96dcc4362d5a7357c81aca8f358986099e750

    public TabDto(Tab tab) {
        ObjectMapper mapper = new ObjectMapper();

        this.seq = tab.getSeq();
        this.workspaceSeq = tab.getWorkspaceSeq();
        this.address = tab.getAddress();
        this.path = tab.getPath();
        this.httpMethod = tab.getHttpMethod();
<<<<<<< HEAD
        this.params = tab.getParams();
        this.headers = tab.getHeaders();
=======

        try {
            this.params = mapper.readValue(tab.getParams(), Map.class);
            this.headers = mapper.readValue(tab.getHeaders(), Map.class);
        } catch (JsonProcessingException e) {
            throw new InvaildMapperException("Mapping failed");
        }
>>>>>>> 59f96dcc4362d5a7357c81aca8f358986099e750
    }

}
