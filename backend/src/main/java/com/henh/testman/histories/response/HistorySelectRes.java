package com.henh.testman.histories.response;

import com.henh.testman.histories.HistoryDto;
import lombok.Getter;

@Getter
public class HistorySelectRes {

    private final HistoryDto history;

    public HistorySelectRes(HistoryDto history) {
        this.history = history;
    }

}
