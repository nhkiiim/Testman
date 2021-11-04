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

}
