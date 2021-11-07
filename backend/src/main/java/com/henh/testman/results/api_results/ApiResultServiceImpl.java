package com.henh.testman.results.api_results;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.tabs.Tab;
import com.henh.testman.tabs.TabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class ApiResultServiceImpl implements ApiResultService {

    private final ApiResultRepository apiResultRepository;

    private final RestTemplate restTemplate;

    private final TabRepository tabRepository;

    @Autowired
    public ApiResultServiceImpl(ApiResultRepository apiResultRepository,
                                RestTemplate restTemplate, TabRepository tabRepository) {
        this.apiResultRepository = apiResultRepository;
        this.restTemplate = restTemplate;
        this.tabRepository = tabRepository;
    }

    @Override
    public Optional<ApiResults> selectApi(Long tapSeq) {
        checkNotNull(tapSeq, "tabSeq must be provided");
        Tab tab = tabRepository.findBySeq(tapSeq)
                .orElseThrow(() -> new NotFoundException("Could not found tab seq " + tapSeq));

        String obj = restTemplate.getForObject(url, String.class);
        return Optional.empty();
    }

    @Override
    public Long deleteApi(Long tapSeq) {
        checkNotNull(tapSeq, "tabSeq must be provided");
        ApiResults apiResults = apiResultRepository.findByTabSeq(tapSeq)
                .orElseThrow(() -> new NotFoundException("Could not found tab seq " + tapSeq));

        apiResultRepository.delete(apiResults);
        return apiResults.getTabSeq();
    }

}
