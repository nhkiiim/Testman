package com.henh.testman.results.load_results;

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
    public List<LoadResult> selectLoad(String userId, Long uriInfoSeq) {
        checkNotNull(userId, "userId must be provided");
        checkNotNull(uriInfoSeq, "uriInfoSeq must be provided");

        return loadResultRepository.findByUserIdAndUriInfoSeq(userId, uriInfoSeq);
    }

    @Override
    public Integer deleteLoad(String userId, Long uriInfoSeq) {
        checkNotNull(userId, "userId must be provided");
        checkNotNull(uriInfoSeq, "uriInfoSeq must be provided");

        List<LoadResult> list = loadResultRepository.findByUserIdAndUriInfoSeq(userId, uriInfoSeq);
        loadResultRepository.deleteAll(list);

        return list.size();
    }

}
