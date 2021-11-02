package com.henh.testman.workspaces;

import com.henh.testman.common.errors.ExistException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.users.UserService;
import com.henh.testman.workspaces.request.WorkspaceRegistReq;
import com.henh.testman.workspaces.response.WorkspaceRegistRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping(path = "regist")
    public ApiResult<WorkspaceRegistRes> registUser(@Valid @RequestBody WorkspaceRegistReq workspaceRegistReq) {
        return success(
                new WorkspaceRegistRes(
                        workspaceService.insertWorkspace(workspaceRegistReq)
                                .map(WorkspaceDto::new)
                                .orElseThrow(() -> new ExistException("Exist title " + workspaceRegistReq.getTitle()))
                )
        );
    }
}
