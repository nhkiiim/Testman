package com.henh.testman.histories;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.histories.request.HistoryRegistReq;
import com.henh.testman.workspaces.Workspace;
import com.henh.testman.workspaces.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    private final WorkspaceRepository workspaceRepository;

    @Autowired
    public HistoryServiceImpl(HistoryRepository historyRepository, WorkspaceRepository workspaceRepository) {
        this.historyRepository = historyRepository;
        this.workspaceRepository = workspaceRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<History> insertHistory(HistoryRegistReq historyRegistReq) {
        Workspace workspace = workspaceRepository.findBySeq(historyRegistReq.getWorkspace_seq())
                .orElseThrow(() -> new NotFoundException("Could not found workspace seq" + historyRegistReq.getWorkspace_seq()));

        History history = History.builder()
                .workspace(workspace)
                .httpMethod(historyRegistReq.getHttpMethod())
                .path(historyRegistReq.getPath())
                .port(historyRegistReq.getPort())
                .headers(historyRegistReq.getHeaders())
                .params(historyRegistReq.getParams())
                .authorization(historyRegistReq.getAuthorization())
                .creatDate(LocalDateTime.now())
                .build();
        historyRepository.save(history);
        return Optional.of(history);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<History> selectHistory(Long seq) {
        checkNotNull(seq, "seq must be provided");
        return historyRepository.findbySeq(seq);
    }


}
