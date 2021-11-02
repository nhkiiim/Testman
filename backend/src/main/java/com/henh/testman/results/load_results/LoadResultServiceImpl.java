package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results.request.WorkReq;
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
    public Optional<LoadResult> work(WorkReq workReq) {
        LoadTest.work(workReq, loadResultRepository);
        return loadResultRepository.findByUserIdAndCreateAt(workReq.getUserId(), workReq.getCreateAt());
    }

}
