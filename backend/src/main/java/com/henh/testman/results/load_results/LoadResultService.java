package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results.request.LoadDeleteReq;
import com.henh.testman.results.load_results.request.LoadGetReq;
import com.henh.testman.results.load_results.request.WorkReq;

import java.util.List;
import java.util.Optional;

public interface LoadResultService {

    Optional<LoadResult> work(WorkReq workReq);

    List<LoadResult> selectLoadResult(LoadGetReq loadGetReq);

    Integer deleteLoadResult(LoadDeleteReq loadDeleteReq);

}
