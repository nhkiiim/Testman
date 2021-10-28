package com.henh.testman.workspaces;

import org.springframework.stereotype.Service;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceService workspaceService;

    public WorkspaceServiceImpl(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

}
