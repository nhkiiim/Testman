package com.henh.testman.workspaces;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class WorkspaceDto {

    private Long seq;

    private String userId;

    private String title;

    private String url;

    private String description;

    private String imgName;

    private String imgPath;

    private LocalDateTime createDate;

    public WorkspaceDto(Workspace workspace) {
        this.seq = workspace.getSeq();
        this.userId = workspace.getUser().getUserId();
        this.title = workspace.getTitle();
        this.url = workspace.getUrl();
        this.description = workspace.getDescription();
        this.imgName = workspace.getImgName();
        this.imgPath = workspace.getImgPath();
        this.createDate = workspace.getCreateDate();
    }

    public WorkspaceDto(Long seq, String id, String title, String url, String description, String imgName, String imgPath, LocalDateTime createDate) {
        this.seq = seq;
        this.userId = id;
        this.title = title;
        this.url = url;
        this.description = description;
        this.imgName = imgName;
        this.imgPath = imgPath;
        this.createDate = createDate;
    }

}
