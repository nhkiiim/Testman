package com.henh.testman.histories;

import com.henh.testman.collections.Collection;
import com.henh.testman.workspaces.Workspace;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
public class HistoryDto {

    private Workspace workspace;

    private String path;

    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

    private LocalDateTime creatDate;

    public HistoryDto(History history) {
        this.workspace = history.getWorkspace();
        this.path = history.getPath();
        this.httpMethod = history.getHttpMethod();
        this.port = history.getPort();
        this.params = history.getParams();
        this.headers = history.getHeaders();
        this.authorization = history.getAuthorization();
        this.creatDate = history.getCreatDate();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("workspace", workspace)
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
