package com.henh.testman.workspaces;

import com.henh.testman.users.User;
import com.henh.testman.common.utils.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import java.time.LocalTime;

@Entity
@Getter
@Setter
public class Workspace extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private User user;

    private String title;

    private String url;

    private String description;

    private String img;

    private LocalTime createDate;

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("seq", seq)
                .append("user", user)
                .append("title", title)
                .append("url", url)
                .append("description", description)
                .append("img", img)
                .append("createDate", createDate)
                .toString();
    }

}
