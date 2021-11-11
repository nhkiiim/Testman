package com.henh.testman.workspaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    Optional<Workspace> findByTitle(String title);

    Optional<Workspace> findBySeq(Long seq);

    Integer countByUserUserId(String userId);

}
