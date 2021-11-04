package com.henh.testman.collections;

import com.henh.testman.common.utils.BaseEntity;
import com.henh.testman.histories.History;
import com.henh.testman.workspaces.Workspace;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Collection extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Workspace workspace;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private History history;

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("seq", seq)
                .append("workspace", workspace)
                .append("history", history)
                .toString();
    }

}
