package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results.request.LoadInsertReq;

import java.util.List;
import java.util.Optional;

public interface LoadResultService {

    Optional<LoadResult> insertLoad(LoadInsertReq loadInsertReq);

    List<LoadResult> selectLoad(String userId, Long uriInfoSeq);

    Integer deleteLoad(String userId, Long uriInfoSeq);

}
