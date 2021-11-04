package com.henh.testman.workspaces;

import com.henh.testman.workspaces.request.WorkspaceRegistReq;
import com.henh.testman.workspaces.request.WorkspaceUpdateReq;

import java.util.List;
import java.util.Optional;

public interface WorkspaceService {

    Optional<Workspace> insertWorkspace(WorkspaceRegistReq workspaceRegistReq, String id);

    Optional<Workspace> selectWorkspace(Long seq);

    List<WorkspaceDto> selectWorkspaceByUserId(String id);

    int countWorkspaceByUserId(String id);

    Optional<Workspace> updateWorkspace(WorkspaceUpdateReq workspaceUpdateReq);

    Optional<String> deleteWorkspace(Long seq);
}
