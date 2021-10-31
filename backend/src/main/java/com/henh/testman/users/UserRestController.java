package com.henh.testman.users;

import com.henh.testman.errors.ExistException;
import com.henh.testman.errors.NotFoundException;
import com.henh.testman.users.request.LoginRequest;
import com.henh.testman.users.request.UserRegistRequest;
import com.henh.testman.users.response.LoginResponse;
import com.henh.testman.users.response.UserDeleteResponse;
import com.henh.testman.users.response.UserRegistResponse;
import com.henh.testman.utils.ApiUtils.ApiResult;
import com.henh.testman.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.henh.testman.utils.ApiUtils.success;

@RestController
@RequestMapping("api/users")
public class UserRestController {

    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "login")
    public ApiResult<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return success(
            new LoginResponse(
                    JwtTokenUtil.getToken(loginRequest.getId()),
                    userService.login(loginRequest)
                        .map(UserDto::new)
                        .orElseThrow(() -> new NotFoundException("Could nof found user for " + loginRequest.getId()))
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

    @PostMapping(path = "regist")
    public ApiResult<UserRegistResponse> registUser(@Valid @RequestBody UserRegistRequest userRegistRequest) {
        return success(
                new UserRegistResponse(
                        userService.insertUser(userRegistRequest)
                                .map(UserDto::new)
                                .orElseThrow(() -> new ExistException("Exist user " + userRegistRequest.getId()))
                )
        );
    }

    @DeleteMapping
    public ApiResult<UserDeleteResponse> deleteUser(Authentication authentication) {
        return success(
                new UserDeleteResponse(
                        userService.deleteUser(authentication.getName())
                )
        );
    }
}