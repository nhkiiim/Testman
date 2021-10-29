package com.henh.testman.results.api_results;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiResultRepository extends JpaRepository<ApiResult, Long> {



}
