package com.henh.testman.histories;

import com.henh.testman.collections.Collection;
import com.henh.testman.common.utils.BaseEntity;
import com.henh.testman.workspaces.Workspace;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class History extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Workspace workspace;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Collection collection;

    private String path;

    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

    private LocalDateTime creatDate;

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("seq", seq)
                .append("workspace", workspace)
                .append("collection", collection)
                .append("path", path)
                .append("httpMethod", httpMethod)
                .append("port", port)
                .append("params", params)
                .append("headers", headers)
                .append("authorization", authorization)
                .append("creatDate", creatDate)
                .toString();
    }

}
