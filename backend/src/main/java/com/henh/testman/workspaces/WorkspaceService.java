package com.henh.testman.workspaces;

import com.henh.testman.workspaces.request.WorkspaceRegistReq;

import java.util.List;
import java.util.Optional;

public interface WorkspaceService {

    Optional<Workspace> insertWorkspace(WorkspaceRegistReq workspaceRegistReq);

    Optional<Workspace> selectWorkspace(Long seq);

    List<WorkspaceDto> selectWorkspaceById(String id);

}
