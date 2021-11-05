package com.henh.testman.users;


import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.JwtTokenUtil;
import com.henh.testman.common.errors.ExistException;
import com.henh.testman.users.request.UserLoginReq;
import com.henh.testman.users.request.UserInsertReq;
import com.henh.testman.users.request.UserUpdateReq;
import com.henh.testman.users.response.UserCheckRes;
import com.henh.testman.users.response.UserLoginRes;

import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.users.response.UserDeleteRes;
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

    @PostMapping("login")
    public ApiResult<UserLoginRes> login(@Valid @RequestBody UserLoginReq userLoginReq) {
        return success(
            new UserLoginRes(
                    JwtTokenUtil.getToken(userLoginReq.getUserId()),
                    userService.login(userLoginReq)
                        .map(UserDto::new)
                        .orElseThrow(() -> new NotFoundException("Could nof found user for " + userLoginReq.getUserId()))
            )
        );
    }

    @GetMapping
    public ApiResult<UserDto> selectUser(Authentication authentication) {
        return success(
                userService.selectUser(authentication.getName())
                        .map(UserDto::new)
                        .orElseThrow(() -> new NotFoundException("Could nof found user for " + authentication.getName()))
        );
    }

    @PostMapping("regist")
    public ApiResult<UserDto> insertUser(@Valid @RequestBody UserInsertReq userInsertReq) {
        return success(
                userService.insertUser(userInsertReq)
                        .map(UserDto::new)
                        .orElseThrow(() -> new ExistException("Exist user " + userInsertReq.getUserId()))
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

    @PatchMapping
    public ApiResult<UserDto> updateUser(@RequestBody UserUpdateReq updateReq, Authentication authentication){
        return success(
                userService.updateUser(updateReq, authentication.getName())
                        .map(UserDto::new)
                        .orElseThrow(() -> new NotFoundException("Could nof found user for " + authentication.getName()))
        );
    }

    @GetMapping("{userId}")
    public ApiResult<UserCheckRes> checkUser(@PathVariable String userId) {
        return success(
                new UserCheckRes(userService.checkUser(userId))
        );
    }

}