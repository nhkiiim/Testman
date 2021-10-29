package com.henh.testman.results.load_results_summary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "load-results-summary")
public class LoadResultSummaryRestController {

    private final LoadResultSummaryService loadResultSummaryService;

    @Autowired
    public LoadResultSummaryRestController(LoadResultSummaryService loadResultSummaryService) {
        this.loadResultSummaryService = loadResultSummaryService;
    }

}
