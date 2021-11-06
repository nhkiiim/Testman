package com.henh.testman.tabs;

import com.henh.testman.common.utils.BaseEntity;
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

    private String address;

    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

    public void update(TabUpdateReq tabUpdateReq){
        this.address = tabUpdateReq.getAddress();
        this.httpMethod = tabUpdateReq.getHttpMethod();
        this.port = tabUpdateReq.getPort();
        this.params = tabUpdateReq.getParams();
        this.headers = tabUpdateReq.getHeaders();
        this.authorization = tabUpdateReq.getAuthorization();
    }

}
