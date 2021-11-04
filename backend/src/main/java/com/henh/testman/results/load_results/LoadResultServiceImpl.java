package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results.request.LoadDeleteReq;
import com.henh.testman.results.load_results.request.LoadGetReq;
import com.henh.testman.results.load_results.request.LoadPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class LoadResultServiceImpl implements LoadResultService {

    private final LoadResultRepository loadResultRepository;

    @Autowired
    public LoadResultServiceImpl(LoadResultRepository loadResultRepository) {
        this.loadResultRepository = loadResultRepository;
    }

    @Override
    public Optional<LoadResult> insertLoad(LoadPostReq loadPostReq) {
        LoadTest.work(loadPostReq, loadResultRepository);

        return loadResultRepository.findByUserIdAndCreateAt(loadPostReq.getUserId(), loadPostReq.getCreateAt());
    }

    @Override
    public List<LoadResult> selectLoad(LoadGetReq loadGetReq) {
        checkNotNull(loadGetReq.getUserId(), "userId must be provided");
        checkNotNull(loadGetReq.getHistorySeq(), "historySeq must be provided");

        return loadResultRepository.findAllByUserIdAndHistorySeq(loadGetReq.getUserId(), loadGetReq.getHistorySeq());
    }

    @Override
    public Integer deleteLoad(LoadDeleteReq loadDeleteReq) {
        checkNotNull(loadDeleteReq.getUserId(), "userId must be provided");
        checkNotNull(loadDeleteReq.getHistorySeq(), "historySeq must be provided");

        List<LoadResult> list = loadResultRepository.findAllByUserIdAndHistorySeq(loadDeleteReq.getUserId(), loadDeleteReq.getHistorySeq());
        loadResultRepository.deleteAll(list);

        return list.size();
    }

}
