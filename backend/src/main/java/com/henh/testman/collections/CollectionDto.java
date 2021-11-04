package com.henh.testman.collections;

import com.henh.testman.uri_info.UriInfo;
import com.henh.testman.workspaces.Workspace;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class CollectionDto {

    private Workspace workspace;

    private UriInfo URIInfo;

    CollectionDto(Collection collection) {
        this.workspace = collection.getWorkspace();
        this.URIInfo = collection.getURIInfo();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("workspace", workspace)
                .append("history", URIInfo)
                .toString();
    }

}
