package com.henh.testman.histories;

import com.henh.testman.uri_info.UriInfo;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HistoryDto {

    private UriInfo uriInfo;

    public HistoryDto(History history) {
        this.uriInfo = history.getUriInfo();
    }

    public HistoryDto(UriInfo uriInfo) {
        this.uriInfo = new UriInfo(uriInfo.getPath(), uriInfo.getHttpMethod(), uriInfo.getPort());
    }

}
