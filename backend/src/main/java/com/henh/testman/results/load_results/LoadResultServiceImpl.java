package com.henh.testman.results.load_results;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.histories.History;
import com.henh.testman.histories.HistoryRepository;
import com.henh.testman.results.load_results.request.LoadInsertReq;
import com.henh.testman.tabs.Tab;
import com.henh.testman.tabs.TabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class LoadResultServiceImpl implements LoadResultService {

    private final LoadResultRepository loadResultRepository;

    private final HistoryRepository historyRepository;

    private final TabRepository tabRepository;

    @Autowired
    public LoadResultServiceImpl(LoadResultRepository loadResultRepository, HistoryRepository historyRepository, TabRepository tabRepository) {
        this.loadResultRepository = loadResultRepository;
        this.historyRepository = historyRepository;
        this.tabRepository = tabRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Long> insertLoad(LoadInsertReq loadInsertReq) {
        Tab tab = tabRepository.findById(loadInsertReq.getTabSeq())
                .orElseThrow(() -> new NotFoundException("could not found tab"));
        tab.updateByLoad(loadInsertReq);
        tabRepository.save(tab);

        History history = historyRepository.save(new History(loadInsertReq));
        LoadTest.work(loadInsertReq, loadResultRepository);

        return Optional.of(history.getSeq());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LoadResult> selectLoad(Long seq) {
        checkNotNull(seq, "seq must be provided");
        return loadResultRepository.findById(seq);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LoadResult> selectLoadByTabSeq(Long tabSeq) {
        checkNotNull(tabSeq, "tabSeq must be provided");
        return loadResultRepository.findByTabSeq(tabSeq);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Integer deleteLoad(Long tabSeq) {
        checkNotNull(tabSeq, "tabSeq must be provided");

        List<LoadResult> list = loadResultRepository.findByTabSeq(tabSeq);
        loadResultRepository.deleteAll(list);

        return list.size();
    }

}
