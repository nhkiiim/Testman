package com.henh.testman.histories;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.histories.response.HistoryDeleteRes;
import com.henh.testman.histories.response.HistorySelectAllRes;
import com.henh.testman.histories.response.HistorySelectRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.henh.testman.common.utils.ApiUtils.success;

@RestController
@RequestMapping("api/histories")
public class HistoryRestController {

    private final HistoryService historyService;

    @Autowired
    public HistoryRestController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping("list/{workspaceSeq}")
    public ApiResult<HistorySelectAllRes> selectAllHistory(@PathVariable Long workspaceSeq) {
        return success(
                new HistorySelectAllRes(
                        historyService.selectAllHistory(workspaceSeq)
                )
        );
    }

    @GetMapping("{seq}")
    public ApiResult<HistorySelectRes> selectHistory(@PathVariable Long seq) {
        return success(
            new HistorySelectRes(
                    historyService.selectHistory(seq)
                            .map(HistoryDto::new)
                            .orElseThrow(() -> new NotFoundException("Could not found history"))
            )
        );
    }

    @DeleteMapping("{seq}")
    public ApiResult<HistoryDeleteRes> deleteHistory(@PathVariable Long seq) {
        return success(
            new HistoryDeleteRes(
                    historyService.deleteHistory(seq)
                            .orElseThrow(() -> new NotFoundException("Could not found history"))
            )
        );
    }

}
