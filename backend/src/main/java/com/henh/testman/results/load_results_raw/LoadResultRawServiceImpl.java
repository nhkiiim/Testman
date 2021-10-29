package com.henh.testman.results.load_results_raw;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoadResultRawServiceImpl implements LoadResultRawService {

    private LoadResultRawRepository loadResultRawRepository;

    @Autowired
    public LoadResultRawServiceImpl(LoadResultRawRepository loadResultRawRepository) {
        this.loadResultRawRepository = loadResultRawRepository;
    }

}
