package com.henh.testman.results.load_results;

import com.henh.testman.results.load_results.request.LoadInsertReq;
import com.henh.testman.uri_info.UriInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class LoadResultServiceImpl implements LoadResultService {

    private final LoadResultRepository loadResultRepository;

    private final UriInfoRepository uriInfoRepository;

    @Autowired
    public LoadResultServiceImpl(LoadResultRepository loadResultRepository, UriInfoRepository uriInfoRepository) {
        this.loadResultRepository = loadResultRepository;
        this.uriInfoRepository = uriInfoRepository;
    }

    @Override
    public Optional<LoadResult> insertLoad(LoadInsertReq loadInsertReq) {
        LoadTest.work(loadInsertReq, loadResultRepository);
        // 히스토리 저장

        return loadResultRepository.findByUserIdAndCreateAt(loadInsertReq.getUserId(), loadInsertReq.getCreateAt());
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
