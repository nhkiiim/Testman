package com.henh.testman.results.load_results;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoadRepository extends CrudRepository<Person, Long> {

}
