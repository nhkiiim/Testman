package com.henh.testman.results.api_results;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApiResultServiceImpl implements ApiResultService {

    private final ApiResultRepository apiResultRepository;

    @Autowired
    public ApiResultServiceImpl(ApiResultRepository apiResultRepository) {
        this.apiResultRepository = apiResultRepository;
    }

}
