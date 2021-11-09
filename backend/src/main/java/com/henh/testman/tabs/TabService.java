package com.henh.testman.tabs;

import com.henh.testman.tabs.request.TabInsertReq;

import java.util.List;
import java.util.Optional;

public interface TabService {

    Optional<Tab> insertTab(TabInsertReq tabInsertReq);

    Optional<Tab> selectTab(Long seq);

    List<TabDto> selectTabByWorkspaceSeq(Long WorkspaceSeq);

    Optional<Long> deleteTab(Long seq);

}
