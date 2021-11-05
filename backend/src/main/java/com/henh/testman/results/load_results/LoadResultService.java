package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results.request.LoadDeleteReq;
import com.henh.testman.results.load_results.request.LoadGetReq;
import com.henh.testman.results.load_results.request.LoadPostReq;

import java.util.List;
import java.util.Optional;

public interface LoadResultService {

    Optional<LoadResult> insertLoad(LoadPostReq loadPostReq);

    List<LoadResult> selectLoad(LoadGetReq loadGetReq);

    Integer deleteLoad(LoadDeleteReq loadDeleteReq);

}
