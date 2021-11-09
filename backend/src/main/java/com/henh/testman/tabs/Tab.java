package com.henh.testman.tabs;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.henh.testman.common.errors.InvalidMapperException;
import com.henh.testman.common.utils.BaseEntity;
import com.henh.testman.results.api_results.request.ApiInsertReq;
import com.henh.testman.results.load_results.request.LoadInsertReq;
import lombok.*;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Tab extends BaseEntity {

    private Long workspaceSeq;

    private String address;

    private String path;

    private String httpMethod;

    private String params;

    private String headers;


    public void updateByApi(ApiInsertReq apiInsertReq) {
        this.address = apiInsertReq.getAddress();
        this.path = apiInsertReq.getPath();
        this.httpMethod = apiInsertReq.getHttpMethod();
        if (apiInsertReq.getParams() != null) this.params = apiInsertReq.getParams().toString();
        if (apiInsertReq.getHeaders() != null) this.headers = apiInsertReq.getHeaders().toString();
    }

    public void updateByLoad(LoadInsertReq loadInsertReq) {
        ObjectMapper mapper = new ObjectMapper();

        this.address = loadInsertReq.getAddress();
        this.path = loadInsertReq.getPath();
        this.httpMethod = loadInsertReq.getHttpMethod();

        try {
            this.params = mapper.writeValueAsString(loadInsertReq.getParams());
            this.headers = mapper.writeValueAsString(loadInsertReq.getHeaders());
        } catch (JsonProcessingException e) {
            throw new InvalidMapperException("Mapping failed");
        }
    }
}
