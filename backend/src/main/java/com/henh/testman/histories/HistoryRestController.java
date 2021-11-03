package com.henh.testman.histories;

import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.histories.request.HistoryRegistReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
