package com.henh.testman.tabs.response;

import com.henh.testman.tabs.TabDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class TabSelectAllRes {

    private final List<TabDto> tabList;

}
