package com.henh.testman.histories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    @Query("select h from History h join fetch h.uriInfo where h.uriInfo.seq = :workspaceSeq")
    List<History> findByWorkspaceSeq(Long workspaceSeq);

}