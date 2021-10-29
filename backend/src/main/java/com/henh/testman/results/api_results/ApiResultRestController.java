package com.henh.testman.results.api_results;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/api-result")
public class ApiResultRestController {

    private final ApiResultService apiResultService;

    @Autowired
    public ApiResultRestController(ApiResultService apiResultService) {
        this.apiResultService = apiResultService;
    }

}
