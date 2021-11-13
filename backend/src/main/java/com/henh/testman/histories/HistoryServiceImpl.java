package com.henh.testman.histories;

import com.henh.testman.common.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    @Autowired
    public HistoryServiceImpl(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<HistoryDto> selectAllHistory(Long workspaceSeq) {
        checkNotNull(workspaceSeq, "workspaceSeq must be provided");
        List<History> histories =  historyRepository.findByWorkspaceSeq(workspaceSeq);

        return histories.stream().map(HistoryDto::new).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<History> selectHistory(Long seq) {
        checkNotNull(seq, "seq must be provided");
        return historyRepository.findById(seq);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Long> deleteHistory(Long seq) {
        checkNotNull(seq, "seq must be provided");
        History history = historyRepository.findById(seq)
                .orElseThrow(() -> new NotFoundException("could not found history"));

        historyRepository.delete(history);
        return Optional.of(history.getSeq());
    }

}
