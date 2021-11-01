package com.henh.testman.results.load_results_summary;

import com.henh.testman.results.load_results_raw.LoadResultRawRepository;
import org.springframework.stereotype.Service;

@Service
public class LoadResultSummaryServiceImpl implements LoadResultSummaryService {

    private final LoadResultRawRepository loadResultRawRepository;

    public LoadResultSummaryServiceImpl(LoadResultRawRepository loadResultRawRepository) {
        this.loadResultRawRepository = loadResultRawRepository;
    }

}
