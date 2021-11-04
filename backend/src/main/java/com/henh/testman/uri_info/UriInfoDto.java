package com.henh.testman.uri_info;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class UriInfoDto {

    private Long seq;

    private Long workspace_seq;

    private Long collection_seq;

    private String path;

    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

    private LocalDateTime creatDate;

    public UriInfoDto(UriInfo uriInfo) {
        this.seq = uriInfo.getSeq();
        this.workspace_seq = uriInfo.getWorkspace().getSeq();
        this.collection_seq = uriInfo.getCollection_seq();
        this.path = uriInfo.getPath();
        this.httpMethod = uriInfo.getHttpMethod();
        this.port = uriInfo.getPort();
        this.params = uriInfo.getParams();
        this.headers = uriInfo.getHeaders();
        this.authorization = uriInfo.getAuthorization();
        this.creatDate = uriInfo.getCreatDate();
    }

    public UriInfoDto(Long seq, Long workspace_seq, Long collection_seq, String path, String httpMethod, Integer port, String params, String headers, String authorization, LocalDateTime creatDate) {
        this.seq = seq;
        this.workspace_seq = workspace_seq;
        this.collection_seq = collection_seq;
        this.path = path;
        this.httpMethod = httpMethod;
        this.port = port;
        this.params = params;
        this.headers = headers;
        this.authorization = authorization;
        this.creatDate = creatDate;
    }

}
