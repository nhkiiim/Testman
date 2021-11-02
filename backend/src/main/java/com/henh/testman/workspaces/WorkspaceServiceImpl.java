package com.henh.testman.workspaces;

import com.henh.testman.common.errors.ExistException;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.users.User;
import com.henh.testman.users.UserRepository;
import com.henh.testman.workspaces.request.WorkspaceRegistReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.Optional;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;

    private final UserRepository userRepository;

    @Autowired
    public WorkspaceServiceImpl(WorkspaceRepository workspaceRepository, UserRepository userRepository) {
        this.workspaceRepository = workspaceRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Workspace> insertWorkspace(WorkspaceRegistReq workspaceRegistReq) {
        Optional<Workspace> checkWorkspace = workspaceRepository.findByTitle(workspaceRegistReq.getTitle());
        if(checkWorkspace.isPresent()) throw new ExistException("Exist title");

        User user = userRepository.findById(workspaceRegistReq.getId())
                .orElseThrow(()-> new NotFoundException("Could not found user for " + workspaceRegistReq.getId()));

        Workspace workspace = Workspace.builder()
                .user(user)
                .url(workspaceRegistReq.getUrl())
                .title(workspaceRegistReq.getTitle())
                .description(workspaceRegistReq.getDescription())
                .createDate(LocalTime.now())
                .img(workspaceRegistReq.getImg())
                .build();
        workspaceRepository.save(workspace);
        return Optional.of(workspace);
    }
}
