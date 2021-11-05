package com.henh.testman.histories;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.histories.request.HistoryDeleteReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    @Autowired
    public HistoryServiceImpl(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    @Override
    public List<HistoryDto> selectAllHistory(Long workspaceSeq) {
        List<History> histories =  historyRepository.findByWorkspaceSeq(workspaceSeq);
        System.out.println(histories.size());
        return histories.stream()
                .map(History::getUriInfo)
                .map(HistoryDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<History> selectHistory(Long seq) {
        return historyRepository.findById(seq);
    }

    @Override
    public Optional<Long> deleteHistory(HistoryDeleteReq historyDeleteReq) {
        History history = historyRepository.findById(historyDeleteReq.getSeq())
                .orElseThrow(() -> new NotFoundException("could not found history"));

        historyRepository.delete(history);
        return Optional.of(history.getSeq());
    }

}
