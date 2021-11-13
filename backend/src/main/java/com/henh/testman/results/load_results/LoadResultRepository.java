package com.henh.testman.results.load_results;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoadResultRepository extends CrudRepository<LoadResult, Long> {

    List<LoadResult> findByTabSeq(Long tabSeq);

}
