package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results.request.WorkRequest;

import java.util.Optional;

public interface LoadResultService {

    Optional<LoadResult> work(WorkRequest workRequest);

}
