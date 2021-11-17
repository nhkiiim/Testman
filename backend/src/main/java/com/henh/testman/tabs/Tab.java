package com.henh.testman.tabs;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.henh.testman.common.errors.InvalidMapperException;
import com.henh.testman.common.utils.BaseEntity;
import com.henh.testman.results.api_results.request.ApiInsertReq;
import com.henh.testman.results.load_results.request.LoadInsertReq;
import com.henh.testman.tabs.request.TabUpdateReq;
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

    private Long collectionSeq;

    private String address;

    private String path;

    private String httpMethod;

    private String body;

    private String headers;

    public void updateByApi(ApiInsertReq apiInsertReq) {
        ObjectMapper mapper = new ObjectMapper();

        this.address = apiInsertReq.getAddress();
        this.path = apiInsertReq.getPath();
        this.httpMethod = apiInsertReq.getHttpMethod();

        try {
            this.body = mapper.writeValueAsString(apiInsertReq.getBody());
            this.headers = mapper.writeValueAsString(apiInsertReq.getHeaders());
        } catch (JsonProcessingException e) {
            throw new InvalidMapperException("Mapping failed");
        }
    }

    public void updateByLoad(LoadInsertReq loadInsertReq) {
        ObjectMapper mapper = new ObjectMapper();

        this.address = loadInsertReq.getAddress();
        this.path = loadInsertReq.getPath();
        this.httpMethod = loadInsertReq.getHttpMethod();

        try {
            this.body = mapper.writeValueAsString(loadInsertReq.getBody());
            this.headers = mapper.writeValueAsString(loadInsertReq.getHeaders());
        } catch (JsonProcessingException e) {
            throw new InvalidMapperException("Mapping failed");
        }
    }

    public void updateByCollection(TabUpdateReq tabUpdateReq) {
        ObjectMapper mapper = new ObjectMapper();

        this.address = tabUpdateReq.getAddress();
        this.path = tabUpdateReq.getPath();
        this.httpMethod = tabUpdateReq.getHttpMethod();
        this.collectionSeq = tabUpdateReq.getCollectionSeq();

        try {
            this.body = mapper.writeValueAsString(tabUpdateReq.getBody());
            this.headers = mapper.writeValueAsString(tabUpdateReq.getHeaders());
        } catch (JsonProcessingException e) {
            throw new InvalidMapperException("Mapping failed");
        }
    }

    public void deleteCollection() {
        this.collectionSeq = null;
    }

}
