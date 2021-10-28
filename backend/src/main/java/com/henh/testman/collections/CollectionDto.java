package com.henh.testman.collections;

import com.henh.testman.workspaces.Workspace;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class CollectionDto {

    private Workspace workspace;

    private History history;

    CollectionDto(Collection collection) {
        this.workspace = collection.getWorkspace();
        this.history = collection.getHistory();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("workspace", workspace)
                .append("history", history)
                .toString();
    }

}
