package com.henh.testman.histories;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.histories.request.HistoryDeleteReq;
import com.henh.testman.histories.response.HistoryDeleteRes;
import com.henh.testman.histories.response.HistorySelectAllRes;
import com.henh.testman.histories.response.HistorySelectRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import static com.henh.testman.common.utils.ApiUtils.success;

@Controller
public class HistoryRestController {

    private final HistoryService historyService;

    @Autowired
    public HistoryRestController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping("{workspaceSeq}")
    public ApiResult<HistorySelectAllRes> selectAllHistory(Authentication authentication, @PathVariable Long workspaceSeq) {
        return success(
                new HistorySelectAllRes(
                        historyService.selectAllHistory(workspaceSeq)
                )
        );
    }

    @GetMapping("{seq}")
    public ApiResult<HistorySelectRes> selectHistory(Authentication authentication, @PathVariable Long seq) {
        return success(
            new HistorySelectRes(
                    historyService.selectHistory(seq)
                            .orElseThrow(() -> new NotFoundException("Could not found history"))
            )
        );
    }

    @DeleteMapping
    public ApiResult<HistoryDeleteRes> deleteHistory(Authentication authentication, HistoryDeleteReq historyDeleteReq) {
        return success(
            new HistoryDeleteRes(
                    historyService.deleteHistory(historyDeleteReq)
                            .orElseThrow(() -> new NotFoundException("Could not found history"))
            )
        );
    }

}
