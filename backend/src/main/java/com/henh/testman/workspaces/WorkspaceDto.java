package com.henh.testman.workspaces;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.time.LocalTime;

@Getter
@Setter
@ToString
public class WorkspaceDto {

    private Long seq;

    private String id;

    private String title;

    private String url;

    private String description;

    private String img;

    private LocalTime createDate;

    public WorkspaceDto(Workspace workspace) {
        this.seq = workspace.getSeq();
        this.id = workspace.getUser().getId();
        this.title = workspace.getTitle();
        this.url = workspace.getUrl();
        this.description = workspace.getDescription();
        this.img = workspace.getImg();
        this.createDate = workspace.getCreateDate();
    }

}
