package com.henh.testman.tabs;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.tabs.request.TabInsertReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class TabServiceImpl implements TabService {

    private final TabRepository tabRepository;

    @Autowired
    public TabServiceImpl(TabRepository tabRepository) {
        this.tabRepository = tabRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Tab> insertTab(TabInsertReq tabInsertReq) {
        return Optional.of(
                tabRepository.save(
                        Tab.builder()
                        .workspaceSeq(tabInsertReq.getWorkspaceSeq())
                        .build()
                )
        );
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Tab> selectTab(Long seq) {
        checkNotNull(seq, "seq must be provided");

        return tabRepository.findById(seq);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TabDto> selectTabByWorkspaceSeq(Long workspaceSeq) {
        checkNotNull(workspaceSeq, "workspaceSeq must be provided");

        return tabRepository.findByWorkspaceSeq(workspaceSeq).stream()
                .map(TabDto::new).collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Long> deleteTab(Long seq) {
        checkNotNull(seq, "seq must be provided");
        Tab tab = tabRepository.findById(seq)
                .orElseThrow(() -> new NotFoundException("Could not find tab by " + seq));

        tabRepository.delete(tab);
        return Optional.of(tab.getSeq());
    }

}
