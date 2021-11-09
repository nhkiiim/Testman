package com.henh.testman.results.api_results;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.henh.testman.results.api_results.request.ApiInsertReq;

import java.util.Optional;

public interface ApiResultService {

    Optional<ApiResults> insertApi(ApiInsertReq apiInsertReq) throws JsonProcessingException;

    Optional<ApiResults> selectApi(Long tabSeq);

    Long deleteApi(Long tabSeq);

}
