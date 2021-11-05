package com.henh.testman.histories;

import java.util.List;
import java.util.Optional;

public interface HistoryService {

    List<HistoryDto> selectAllHistory(Long workspaceSeq);

    Optional<History> selectHistory(Long seq);

    Optional<Long> deleteHistory(Long seq);

}
