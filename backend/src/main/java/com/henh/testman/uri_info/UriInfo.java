package com.henh.testman.uri_info;

import com.henh.testman.common.utils.BaseEntity;
import com.henh.testman.workspaces.Workspace;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UriInfo extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Workspace workspace;

    private Long collection_seq;

    private String path;

    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

    private LocalDateTime creatDate;

    public void update(Long collection_seq, String path, String httpMethod,
                  Integer port, String params, String headers, String authorization){
        if(collection_seq!=null){
            this.collection_seq = collection_seq;
        }
        if(path!=null){
            this.path = path;
        }
        if(httpMethod!=null){
            this.httpMethod = httpMethod;
        }
        if(port!=null){
            this.port = port;
        }
        if(params!=null){
            this.params = params;
        }
        if(headers!=null){
            this.headers = headers;
        }
        if(authorization!=null){
            this.authorization = authorization;
        }
    }

}
