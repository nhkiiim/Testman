package com.henh.testman.results.api_results;

import java.util.Optional;

public interface ApiResultService {

    Optional<ApiResults> selectApi(Long tapSeq);

    Long deleteApi(Long tapSeq);

}
