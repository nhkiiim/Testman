package com.henh.testman.histories.response;

import com.henh.testman.histories.History;
import com.henh.testman.uri_info.UriInfo;
import lombok.Getter;

@Getter
public class HistorySelectRes {

    private UriInfo uriInfo;

    public HistorySelectRes(History history) {
        this.uriInfo = history.getUriInfo();
    }

}
