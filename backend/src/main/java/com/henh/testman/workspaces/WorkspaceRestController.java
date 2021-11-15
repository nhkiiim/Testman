package com.henh.testman.workspaces;

import com.henh.testman.common.errors.ExistException;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.workspaces.request.WorkspaceInsertReq;
import com.henh.testman.workspaces.request.WorkspaceUpdateReq;
import com.henh.testman.workspaces.response.WorkspaceCountRes;
import com.henh.testman.workspaces.response.WorkspaceDeleteRes;
import com.henh.testman.workspaces.response.WorkspaceGetAllRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.henh.testman.common.utils.ApiUtils.success;


@RestController
@RequestMapping("api/workspaces")
public class WorkspaceRestController {

    private final WorkspaceService workspaceService;

    @Autowired
    public WorkspaceRestController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @PostMapping
    public ApiResult<WorkspaceDto> insertWorkspace(WorkspaceInsertReq workspaceInsertReq, Authentication authentication) {
        return success(
                workspaceService.insertWorkspace(workspaceInsertReq, authentication.getName())
                        .map(WorkspaceDto::new)
                        .orElseThrow(() -> new ExistException("Exist title " + workspaceInsertReq.getTitle()))
        );
    }

    @GetMapping("{seq}")
    public ApiResult<WorkspaceDto> selectWorkspace(@PathVariable Long seq) {
        return success(
                workspaceService.selectWorkspace(seq)
                        .map(WorkspaceDto::new)
                        .orElseThrow(() -> new NotFoundException("Could not found seq " + seq))
        );
    }

    @GetMapping
    public ApiResult<WorkspaceGetAllRes> selectWorkspaceByUserId(Authentication authentication) {
        return success(
                new WorkspaceGetAllRes(
                        workspaceService.selectWorkspaceByUserId(authentication.getName())
                )
        );
    }

    @GetMapping("count")
    public ApiResult<WorkspaceCountRes> countWorkspaceByUserId(Authentication authentication) {
        return success(
                new WorkspaceCountRes(
                        workspaceService.countWorkspaceByUserId(authentication.getName())
                )
        );
    }

    @PatchMapping
    public ApiResult<WorkspaceDto> updateWorkspace(@Valid WorkspaceUpdateReq workspaceUpdateReq) {
        return success(
                workspaceService.updateWorkspace(workspaceUpdateReq)
                        .map(WorkspaceDto::new)
                        .orElseThrow(() -> new NotFoundException("Could not found workspace seq "+ workspaceUpdateReq.getSeq()))
        );
    }

    @DeleteMapping("{seq}")
    public ApiResult<WorkspaceDeleteRes> deleteWorkspace(@PathVariable Long seq){
        return success(
            new WorkspaceDeleteRes(
                workspaceService.deleteWorkspace(seq)
                        .orElseThrow(() -> new NotFoundException("Could not found workspace seq "+ seq))
            )
        );
    }

}
