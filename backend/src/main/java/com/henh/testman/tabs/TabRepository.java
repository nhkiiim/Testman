package com.henh.testman.tabs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TabRepository extends JpaRepository<Tab, Long> {

    List<Tab> findByWorkspaceSeq(Long workspaceSeq);

    Optional<Tab> findBySeq(Long seq);

}
