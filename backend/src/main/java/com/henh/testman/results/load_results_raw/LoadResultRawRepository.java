package com.henh.testman.results.load_results_raw;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoadResultRawRepository extends CrudRepository<LoadResultRaw, Long> {

}
