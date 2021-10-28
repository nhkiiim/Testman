package com.henh.testman.workspaces;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.time.LocalTime;

public class WorkspaceDto {

    private String title;

    private String url;

    private String description;

    private String img;

    private LocalTime createDate;

    public WorkspaceDto(Workspace workspace) {
        this.title = workspace.getTitle();
        this.url = workspace.getUrl();
        this.description = workspace.getDescription();
        this.img = workspace.getImg();
        this.createDate = workspace.getCreateDate();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("title", title)
                .append("url", url)
                .append("description", description)
                .append("img", img)
                .append("createDate", createDate)
                .toString();
    }

}
