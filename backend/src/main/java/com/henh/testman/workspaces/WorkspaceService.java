package com.henh.testman.workspaces;

import com.henh.testman.workspaces.request.WorkspaceRegistReq;

import java.util.Optional;

public interface WorkspaceService {

    Optional<Workspace> insertWorkspace(WorkspaceRegistReq workspaceRegistReq);

}
