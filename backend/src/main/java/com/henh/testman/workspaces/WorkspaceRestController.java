package com.henh.testman.workspaces;

import com.henh.testman.common.errors.ExistException;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.users.UserService;
import com.henh.testman.workspaces.request.WorkspaceRegistReq;
import com.henh.testman.workspaces.request.WorkspaceUpdateReq;
import com.henh.testman.workspaces.response.WorkspaceCountRes;
import com.henh.testman.workspaces.response.WorkspaceGetAllRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.henh.testman.common.utils.ApiUtils.success;


@RestController
@RequestMapping("api/workspaces")
public class WorkspaceRestController {

    private WorkspaceService workspaceService;

    private UserService userService;

    @Autowired
    public WorkspaceRestController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @PostMapping("regist")
    public ApiResult<WorkspaceDto> registWorkspace(@Valid @RequestBody WorkspaceRegistReq workspaceRegistReq, Authentication authentication) {
        return success(
                workspaceService.insertWorkspace(workspaceRegistReq, authentication.getName())
                        .map(WorkspaceDto::new)
                        .orElseThrow(() -> new ExistException("Exist title " + workspaceRegistReq.getTitle()))
        );
    }

    @GetMapping("{seq}")
    public ApiResult<WorkspaceDto> getWorkspace(@PathVariable Long seq) {
        return success(
                workspaceService.selectWorkspace(seq)
                        .map(WorkspaceDto::new)
                        .orElseThrow(() -> new NotFoundException("Could not found seq " + seq))
        );
    }

    @GetMapping
    public ApiResult<WorkspaceGetAllRes> getAllWorkspaceByUser(Authentication authentication) {
        return success(
                new WorkspaceGetAllRes(
                        workspaceService.selectWorkspaceById(authentication.getName())
                )
        );
    }

    @GetMapping("count")
    public ApiResult<WorkspaceCountRes> countWorkspaceByUser(Authentication authentication) {
        return success(
                new WorkspaceCountRes(
                        workspaceService.countWorkspaceById(authentication.getName())
                )
        );
    }

    @PatchMapping
    public ApiResult<WorkspaceDto> countWorkspaceByUser(@RequestBody WorkspaceUpdateReq workspaceUpdateReq) {
        return success(
                workspaceService.updateWorkspace(workspaceUpdateReq)
                        .map(WorkspaceDto::new)
                        .orElseThrow(() -> new NotFoundException("Could not found workspace seq "+ workspaceUpdateReq.getSeq()))
        );
    }
}
