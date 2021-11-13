package com.henh.testman.histories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends CrudRepository<History, Long> {

    List<History> findByWorkspaceSeq(Long workspaceSeq);

}