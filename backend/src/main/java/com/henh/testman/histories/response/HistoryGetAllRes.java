package com.henh.testman.histories.response;

import com.henh.testman.histories.HistoryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class HistoryGetAllRes {

    List<HistoryDto> historyDtoList;

}
