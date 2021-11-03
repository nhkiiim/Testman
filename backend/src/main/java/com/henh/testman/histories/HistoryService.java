package com.henh.testman.histories;

import com.henh.testman.histories.request.HistoryRegistReq;

import java.util.Optional;

public interface HistoryService {

    Optional<History> insertHistory(HistoryRegistReq historyRegistReq);

    Optional<History> selectHistory(Long seq);

}
