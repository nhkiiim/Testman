package com.henh.testman.histories;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/histories")
public class HistoryRestController {

    private final HistoryService historyServicel;

    public HistoryRestController(HistoryService historyService) {
        this.historyServicel = historyService;
    }


}
