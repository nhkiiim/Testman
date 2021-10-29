package com.henh.testman.users;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.JwtTokenUtil;
import com.henh.testman.users.request.LoginRequest;
import com.henh.testman.users.response.LoginResponse;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.henh.testman.common.utils.ApiUtils.success;

@RestController
@RequestMapping("api/users")
public class UserRestController {

    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "login")
    public ApiResult<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return success(
            new LoginResponse(
                    JwtTokenUtil.getToken(request.getUserId()),
                    userService.login(request.getUserId(), request.getPassword())
                        .map(UserDto::new)
                        .orElseThrow(() -> new NotFoundException("Could nof found user for " + request.getUserId()))
            )
        );
    }

    @GetMapping(path = "me")
    public ApiResult<UserDto> me(Authentication authentication) {
        return success(
                userService.selectUser(authentication.getName())
                        .map(UserDto::new)
                        .orElseThrow(() -> new NotFoundException("Could nof found user for " + authentication.getName()))
        );
    }
}