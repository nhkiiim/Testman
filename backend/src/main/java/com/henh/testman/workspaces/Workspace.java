package com.henh.testman.workspaces;

import com.henh.testman.common.utils.BaseEntity;
import com.henh.testman.users.User;
import com.henh.testman.workspaces.request.WorkspaceUpdateReq;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Workspace extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String title;

    private String url;

    private String description;

    private String imgName;

    private String imgPath;

    private LocalDateTime createDate;

    public void update(WorkspaceUpdateReq workspaceUpdateReq, String imgPath){
        this.title = workspaceUpdateReq.getTitle();
        this.url = workspaceUpdateReq.getUrl();
        this.description = workspaceUpdateReq.getDescription();
        this.imgName = workspaceUpdateReq.getImg().getOriginalFilename();
        if (imgPath != null) this.imgPath = imgPath;
    }

}
