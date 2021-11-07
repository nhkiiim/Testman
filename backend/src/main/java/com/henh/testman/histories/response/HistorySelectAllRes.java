package com.henh.testman.histories.response;

import com.henh.testman.histories.HistoryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class HistorySelectAllRes {

    private final List<HistoryDto> historyList;

}
