package com.henh.testman.results.load_results;

import com.henh.testman.histories.History;
import com.henh.testman.histories.HistoryRepository;
import com.henh.testman.results.load_results.request.LoadInsertReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class LoadResultServiceImpl implements LoadResultService {

    private final LoadResultRepository loadResultRepository;

    private final HistoryRepository historyRepository;

    @Autowired
    public LoadResultServiceImpl(LoadResultRepository loadResultRepository, HistoryRepository historyRepository) {
        this.loadResultRepository = loadResultRepository;
        this.historyRepository = historyRepository;
    }

    @Override
    public Optional<Long> insertLoad(LoadInsertReq loadInsertReq) {
        History history = historyRepository.save(new History(loadInsertReq));
        LoadTest.work(loadInsertReq, loadResultRepository);

        return Optional.of(history.getSeq());
    }

    @Override
    public Optional<LoadResult> selectLoad(Long seq) {
        checkNotNull(seq, "seq must be provided");
        return loadResultRepository.findById(seq);
    }

    @Override
    public List<LoadResult> selectLoadByTabSeq(Long tabSeq) {
        checkNotNull(tabSeq, "tabSeq must be provided");
        return loadResultRepository.findByTabSeq(tabSeq);
    }

    @Override
    public Integer deleteLoad(Long tabSeq) {
        checkNotNull(tabSeq, "tabSeq must be provided");

        List<LoadResult> list = loadResultRepository.findByTabSeq(tabSeq);
        loadResultRepository.deleteAll(list);

        return list.size();
    }

}
