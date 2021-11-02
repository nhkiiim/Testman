package com.henh.testman.workspaces;

import com.henh.testman.common.errors.ExistException;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.users.UserService;
import com.henh.testman.workspaces.request.WorkspaceRegistReq;
import com.henh.testman.workspaces.response.WorkspaceGetAllRes;
import com.henh.testman.workspaces.response.WorkspaceGetRes;
import com.henh.testman.workspaces.response.WorkspaceRegistRes;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ApiResult<WorkspaceRegistRes> registWorkspace(@Valid @RequestBody WorkspaceRegistReq workspaceRegistReq) {
        return success(
                new WorkspaceRegistRes(
                        workspaceService.insertWorkspace(workspaceRegistReq)
                                .map(WorkspaceDto::new)
                                .orElseThrow(() -> new ExistException("Exist title " + workspaceRegistReq.getTitle()))
                )
        );
    }

    @GetMapping("regist/{seq}")
    public ApiResult<WorkspaceGetRes> getWorkspace(Long seq) {
        return success(
                new WorkspaceGetRes(
                        workspaceService.selectWorkspace(seq)
                                .map(WorkspaceDto::new)
                                .orElseThrow(() -> new NotFoundException("Could not found seq " + seq))
                )
        );
    }

    @GetMapping("regist/{id}")
    public ApiResult<WorkspaceGetAllRes> getAllWorkspaceByUser(String id) {
        return success(
                new WorkspaceGetAllRes(
                        workspaceService.selectWorkspaceById(id)
                )
        );
    }

}
