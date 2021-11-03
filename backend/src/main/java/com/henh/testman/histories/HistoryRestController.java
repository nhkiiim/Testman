package com.henh.testman.histories;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.histories.request.HistoryRegistReq;
import com.henh.testman.histories.response.HistoryGetAllRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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

    @PostMapping
    public ApiResult<HistoryDto> registHistory(@RequestBody HistoryRegistReq historyRegistReq){
        return success(
                historyService.insertHistory(historyRegistReq)
                        .map(HistoryDto::new)
                        .orElseThrow(() -> new IllegalArgumentException("Could not regist history"))
        );
    }

    @GetMapping("{seq}")
    public ApiResult<HistoryDto> getHistory(@PathVariable Long seq){
        return success(
                historyService.selectHistory(seq)
                        .map(HistoryDto::new)
                        .orElseThrow(() -> new NotFoundException("Could not found history seq" + seq))
        );
    }

    @GetMapping
    public ApiResult<HistoryGetAllRes> getAllHistoryByUser(Authentication authentication){
        return success(
                new HistoryGetAllRes(
                        historyService.selectHistoryByUserId(authentication.getName())
                )
        );
    }

}
