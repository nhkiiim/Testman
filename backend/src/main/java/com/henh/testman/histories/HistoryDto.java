package com.henh.testman.histories;

import com.henh.testman.collections.Collection;
import com.henh.testman.workspaces.Workspace;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@ToString
public class HistoryDto {

    private Long workspace_seq;

    private String path;

    private String httpMethod;

    private Integer port;

    private String params;

    private String headers;

    private String authorization;

    private LocalDateTime creatDate;

    public HistoryDto(History history) {
        this.workspace_seq = history.getWorkspace().getSeq();
        this.path = history.getPath();
        this.httpMethod = history.getHttpMethod();
        this.port = history.getPort();
        this.params = history.getParams();
        this.headers = history.getHeaders();
        this.authorization = history.getAuthorization();
        this.creatDate = history.getCreatDate();
    }

}
