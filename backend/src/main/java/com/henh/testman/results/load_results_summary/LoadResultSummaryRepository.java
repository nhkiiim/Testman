package com.henh.testman.results.load_results_summary;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoadResultSummaryRepository extends CrudRepository<LoadResultSummary, Long> {
}
