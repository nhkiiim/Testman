package com.henh.testman.results.load_results_raw;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoadResultRawRepository extends JpaRepository<LoadResultRaw, Long> {

}
