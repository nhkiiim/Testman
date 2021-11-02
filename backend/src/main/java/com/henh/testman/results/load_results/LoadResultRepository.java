package com.henh.testman.results.load_results;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface LoadResultRepository extends CrudRepository<LoadResult, Long> {

    Optional<LoadResult> findByUserIdAndCreateAt(String userId, LocalDateTime creatAt);

}
