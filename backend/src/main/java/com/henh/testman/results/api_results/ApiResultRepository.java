package com.henh.testman.results.api_results;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiResultRepository extends CrudRepository<ApiResult, Long> {

}
