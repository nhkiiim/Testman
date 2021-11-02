package com.henh.testman.users;


import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.JwtTokenUtil;
import com.henh.testman.common.errors.ExistException;
import com.henh.testman.users.request.UserLoginReq;
import com.henh.testman.users.request.UserRegistReq;
import com.henh.testman.users.response.UserLoginRes;

import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.users.response.UserDeleteRes;
import com.henh.testman.users.response.UserRegistRes;
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
    public ApiResult<UserLoginRes> login(@Valid @RequestBody UserLoginReq userLoginReq) {
        return success(
            new UserLoginRes(
                    JwtTokenUtil.getToken(userLoginReq.getId()),
                    userService.login(userLoginReq)
                        .map(UserDto::new)
                        .orElseThrow(() -> new NotFoundException("Could nof found user for " + userLoginReq.getId()))
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
    public ApiResult<UserRegistRes> registUser(@Valid @RequestBody UserRegistReq userRegistReq) {
        return success(
                new UserRegistRes(
                        userService.insertUser(userRegistReq)
                                .map(UserDto::new)
                                .orElseThrow(() -> new ExistException("Exist user " + userRegistReq.getId()))
                )
        );
    }

    @DeleteMapping
    public ApiResult<UserDeleteRes> deleteUser(Authentication authentication) {
        return success(
                new UserDeleteRes(
                        userService.deleteUser(authentication.getName())
                                .orElseThrow(() -> new NotFoundException("Could nof found user for " + authentication.getName()))
                )
        );
    }
}