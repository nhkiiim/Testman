package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results.request.LoadPostReq;

import java.util.List;
import java.util.Optional;

public interface LoadResultService {

    Optional<LoadResult> insertLoad(LoadPostReq loadPostReq);

    List<LoadResult> selectLoad(String userId, Long uriInfoSeq);

    Integer deleteLoad(String userId, Long uriInfoSeq);

}
