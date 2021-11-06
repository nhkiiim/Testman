package com.henh.testman.workspaces;

import com.henh.testman.common.errors.ExistException;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.users.User;
import com.henh.testman.users.UserRepository;
import com.henh.testman.workspaces.request.WorkspaceRegistReq;
import com.henh.testman.workspaces.request.WorkspaceUpdateReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;

    private final WorkspaceRepositorySupport workspaceRepositorySupport;

    private final UserRepository userRepository;

    @Autowired
    public WorkspaceServiceImpl(WorkspaceRepository workspaceRepository,
                                WorkspaceRepositorySupport workspaceRepositorySupport, UserRepository userRepository){
        this.workspaceRepository=workspaceRepository;
        this.workspaceRepositorySupport=workspaceRepositorySupport;
        this.userRepository=userRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Workspace> insertWorkspace(WorkspaceRegistReq workspaceRegistReq, String id) {
        Optional<Workspace> checkWorkspace = workspaceRepository.findByTitle(workspaceRegistReq.getTitle());
        if(checkWorkspace.isPresent()) throw new ExistException("Exist title");

        User user = userRepository.findByUserId(id)
                .orElseThrow(()-> new NotFoundException("Could not found user for " + id));

        return Optional.of(
                workspaceRepository.save(
                        Workspace.builder()
                        .user(user)
                        .url(workspaceRegistReq.getUrl())
                        .title(workspaceRegistReq.getTitle())
                        .description(workspaceRegistReq.getDescription())
                        .createDate(LocalDateTime.now())
                        .img(workspaceRegistReq.getImg())
                        .build()
                )
        );
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Workspace> selectWorkspace(Long seq) {
        checkNotNull(seq, "seq must be provided");
        return workspaceRepository.findBySeq(seq);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkspaceDto> selectWorkspaceByUserId(String userId) {
        checkNotNull(userId, "userId must be provided");
        return workspaceRepositorySupport.findByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public int countWorkspaceByUserId(String userId) {
        checkNotNull(userId, "userId must be provided");
        return workspaceRepository.countByUserUserId(userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Workspace> updateWorkspace(WorkspaceUpdateReq workspaceUpdateReq){
        Workspace workspace = workspaceRepository.findBySeq(workspaceUpdateReq.getSeq())
                .orElseThrow(()-> new NotFoundException("Could not found workspace seq "+ workspaceUpdateReq.getSeq()));

        workspace.update(workspaceUpdateReq.getTitle(), workspaceUpdateReq.getUrl(), workspaceUpdateReq.getDescription());
        return Optional.of(
                workspaceRepository.save(workspace)
        );
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<String> deleteWorkspace(Long seq){
        Workspace workspace = workspaceRepository.findBySeq(seq)
                .orElseThrow(()-> new NotFoundException("Could not found workspace seq " + seq));
        workspaceRepository.delete(workspace);
        return Optional.of(workspace.getTitle());
    }

}
