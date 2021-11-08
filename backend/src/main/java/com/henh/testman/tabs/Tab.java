package com.henh.testman.tabs;

import com.henh.testman.common.utils.BaseEntity;
import com.henh.testman.results.api_results.request.ApiInsertReq;
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

    public void updateByApi(ApiInsertReq apiInsertReq){
        this.address = apiInsertReq.getAddress();
        this.path = apiInsertReq.getPath();
        this.httpMethod = apiInsertReq.getHttpMethod();
        if(apiInsertReq.getParams()!=null) this.params = apiInsertReq.getParams().toString();
        if(apiInsertReq.getHeaders()!=null) this.headers = apiInsertReq.getHeaders().toString();
    }
}
