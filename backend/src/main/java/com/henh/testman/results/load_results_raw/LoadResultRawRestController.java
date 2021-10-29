package com.henh.testman.results.load_results_raw;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/load-result-raw")
public class LoadResultRawRestController {

    private LoadResultRawService loadResultRawService;

    @Autowired
    public LoadResultRawRestController(LoadResultRawService loadResultRawService) {
        this.loadResultRawService = loadResultRawService;
    }

}
