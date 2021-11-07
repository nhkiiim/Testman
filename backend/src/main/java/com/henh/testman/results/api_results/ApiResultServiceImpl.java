package com.henh.testman.results.api_results;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ApiResultServiceImpl implements ApiResultService {

    private final ApiResultRepository apiResultRepository;

    @Autowired
    public ApiResultServiceImpl(ApiResultRepository apiResultRepository) {
        this.apiResultRepository = apiResultRepository;
    }

    @Override
    public Optional<ApiResults> selectApi(Long tapSeq) {

        return Optional.empty();
    }

    @Override
    public Long deleteApi(Long tapSeq) {
        return null;
    }
}
