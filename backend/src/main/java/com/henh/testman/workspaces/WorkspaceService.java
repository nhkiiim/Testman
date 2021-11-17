package com.henh.testman.workspaces;

import com.henh.testman.workspaces.request.WorkspaceInsertReq;
import com.henh.testman.workspaces.request.WorkspaceUpdateReq;

import java.util.List;
import java.util.Optional;

public interface WorkspaceService {

    Optional<Workspace> insertWorkspace(WorkspaceInsertReq workspaceInsertReq, String userId);

    Optional<Workspace> selectWorkspace(Long seq);

    List<WorkspaceDto> selectWorkspaceByUserId(String userId);

    Integer countWorkspaceByUserId(String userId);

    Optional<Workspace> updateWorkspace(WorkspaceUpdateReq workspaceUpdateReq, String userId);

    Optional<String> deleteWorkspace(Long seq);

}
