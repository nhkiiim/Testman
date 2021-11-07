package com.henh.testman.results.api_results;

import java.util.Optional;

public interface ApiResultService {

    Optional<ApiResults> selectApi(Long tabSeq);

    Long deleteApi(Long tabSeq);

}
