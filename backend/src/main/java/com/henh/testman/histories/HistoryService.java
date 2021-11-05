package com.henh.testman.histories;

import com.henh.testman.histories.request.HistoryDeleteReq;

import java.util.List;
import java.util.Optional;

public interface HistoryService {

    List<HistoryDto> selectAllHistory(Long workspaceSeq);

    Optional<History> selectHistory(Long seq);

    Optional<Long> deleteHistory(HistoryDeleteReq historyDeleteReq);

}
