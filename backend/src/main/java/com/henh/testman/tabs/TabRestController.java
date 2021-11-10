package com.henh.testman.tabs;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.tabs.request.TabInsertReq;
import com.henh.testman.tabs.request.TabUpdateReq;
import com.henh.testman.tabs.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    public ApiResult<TabInsertRes> insertTab(@Valid @RequestBody TabInsertReq tabInsertReq){
        return success(
                new TabInsertRes(
                        tabService.insertTab(tabInsertReq)
                                .map(TabDto::new)
                                .orElseThrow(() -> new IllegalArgumentException("Could not insert tab"))
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

    @GetMapping("collection/{collectionSeq}")
    public ApiResult<TabSelectAllRes> selectTabByCollectionSeq(@PathVariable Long collectionSeq){
        return success(
                new TabSelectAllRes(
                        tabService.selectTabByCollectionSeq(collectionSeq)
                )
        );
    }

    @PatchMapping
    public ApiResult<TabUpdateRes> updateTabByCollectionSeq(@Valid @RequestBody TabUpdateReq tabUpdateReq){
        return success(
                new TabUpdateRes(
                        tabService.updateTabByCollectionSeq(tabUpdateReq)
                                .map(TabDto::new)
                                .orElseThrow(() -> new IllegalArgumentException("Could not insert tab"))
                )
        );
    }

    @DeleteMapping("{seq}")
    public ApiResult<TabDeleteRes> deleteTab(@PathVariable Long seq){
        return success(
                new TabDeleteRes(
                        tabService.deleteTab(seq)
                                .orElseThrow(() -> new NotFoundException("Could not found tab " + seq))
                )
        );
    }

}
