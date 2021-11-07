package com.henh.testman.results.api_results;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApiResultRepository extends CrudRepository<ApiResults, Long> {

    Optional<ApiResults> findByTapSeq(Long tabSeq);

}
