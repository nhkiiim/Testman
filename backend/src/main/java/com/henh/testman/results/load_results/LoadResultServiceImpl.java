package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results.request.WorkRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoadResultServiceImpl implements LoadResultService {

    private final LoadResultRepository loadResultRepository;

    @Autowired
    public LoadResultServiceImpl(LoadResultRepository loadResultRepository) {
        this.loadResultRepository = loadResultRepository;
    }

    @Override
    public Optional<LoadResult> work(WorkRequest workRequest) {
        LoadTest.work(workRequest, loadResultRepository);
        return loadResultRepository.findByUserIdAndCreateAt(workRequest.getUserId(), workRequest.getCreateAt());
    }

}
