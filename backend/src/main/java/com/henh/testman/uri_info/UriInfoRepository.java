package com.henh.testman.uri_info;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UriInfoRepository extends JpaRepository<UriInfo, Long> {

    Optional<UriInfo> findBySeq(Long seq);

}
