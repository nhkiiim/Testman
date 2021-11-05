package com.henh.testman.histories.response;

import com.henh.testman.histories.HistoryDto;
import lombok.Getter;

import java.util.List;

@Getter
public class HistorySelectAllRes {

    private final List<HistoryDto> historyList;

    public HistorySelectAllRes(List<HistoryDto> historyDtoList) {
        this.historyList = historyDtoList;
    }

}
