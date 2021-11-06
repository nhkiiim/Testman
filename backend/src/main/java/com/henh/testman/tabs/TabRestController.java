package com.henh.testman.tabs;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.tabs.request.TabInsertReq;
import com.henh.testman.tabs.request.TabUpdateReq;
import com.henh.testman.tabs.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.henh.testman.common.utils.ApiUtils.success;

@RestController
@RequestMapping("api/tabs")
public class TabRestController {

    private final TabService tabService;

    @Autowired
    public TabRestController(TabService tabService) {
        this.tabService = tabService;
    }

    @PostMapping
    public ApiResult<TabInsertRes> insertTab(@RequestBody TabInsertReq tabInsertReq){
        return success(
                new TabInsertRes(
                        tabService.insertTab(tabInsertReq)
                                .map(TabDto::new)
                                .orElseThrow(() -> new IllegalArgumentException("Could not insert history"))
                )
        );
    }

    @GetMapping("{seq}")
    public ApiResult<TabSelectRes> selectTab(@PathVariable Long seq){
        return success(
                new TabSelectRes(
                        tabService.selectTab(seq)
                                .map(TabDto::new)
                                .orElseThrow(() -> new NotFoundException("Could not found uri info seq " + seq))
                )
        );
    }

    @GetMapping("list/{workspaceSeq}")
    public ApiResult<TabSelectAllRes> selectTabByWorkspaceSeq(@PathVariable Long workspaceSeq){
        return success(
                new TabSelectAllRes(
                        tabService.selectTabByWorkspaceSeq(workspaceSeq)
                )
        );
    }

    @PatchMapping
    public ApiResult<TabUpdateRes> updateTab(@RequestBody TabUpdateReq tabUpdateReq){
        System.out.println(tabUpdateReq.toString());
        return success(
                new TabUpdateRes(
                        tabService.updateTab(tabUpdateReq)
                                .map(TabDto::new)
                                .orElseThrow(() -> new NotFoundException("Could not found uri info " + tabUpdateReq.getSeq()))
                )
        );
    }

    @DeleteMapping("{seq}")
    public ApiResult<TabDeleteRes> deleteTab(@PathVariable Long seq){
        return success(
                new TabDeleteRes(
                        tabService.deleteTab(seq)
                                .orElseThrow(() -> new NotFoundException("Could not found uri info " + seq))
                )
        );
    }

}
