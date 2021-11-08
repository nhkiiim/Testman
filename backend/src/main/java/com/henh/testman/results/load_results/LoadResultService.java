package com.henh.testman.results.load_results;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.henh.testman.results.load_results.request.LoadInsertReq;

import java.util.List;
import java.util.Optional;

public interface LoadResultService {

    Optional<Long> insertLoad(LoadInsertReq loadInsertReq) throws JsonProcessingException;

    List<LoadResult> selectLoadByTabSeq(Long tabSeq);

    Optional<LoadResult> selectLoad(Long seq);

    Integer deleteLoad(Long tabSeq);

}
