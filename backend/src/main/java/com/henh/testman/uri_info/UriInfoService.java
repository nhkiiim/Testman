package com.henh.testman.uri_info;

import com.henh.testman.uri_info.request.UriInfoInsertReq;
import com.henh.testman.uri_info.request.UriInfoUpdateReq;

import java.util.List;
import java.util.Optional;

public interface UriInfoService {

    Optional<UriInfo> insertUriInfo(UriInfoInsertReq uriInfoInsertReq);

    Optional<UriInfo> selectUriInfo(Long seq);

    List<UriInfoDto> selectUriInfoByUserAndCollection(String userId, Long collection_seq);

    Optional<UriInfo> updateUriInfo(UriInfoUpdateReq uriInfoUpdateReq);

}
