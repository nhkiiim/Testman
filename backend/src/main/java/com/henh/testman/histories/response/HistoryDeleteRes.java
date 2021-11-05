package com.henh.testman.histories.response;

import lombok.Getter;

@Getter
public class HistoryDeleteRes {

    private Long seq;

    public HistoryDeleteRes(Long seq) {
        this.seq = seq;
    }

}
