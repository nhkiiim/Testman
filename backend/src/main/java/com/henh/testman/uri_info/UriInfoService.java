package com.henh.testman.uri_info;

import com.henh.testman.uri_info.request.UriInfoRegistReq;

import java.util.List;
import java.util.Optional;

public interface UriInfoService {

    Optional<UriInfo> insertUriInfo(UriInfoRegistReq uriInfoRegistReq);

    Optional<UriInfo> selectUriInfo(Long seq);

    List<UriInfoDto> selectUriInfoByUserId(String userId);

}
