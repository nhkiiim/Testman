package com.henh.testman.users;

import com.henh.testman.users.request.UserLoginReq;
import com.henh.testman.users.request.UserInsertReq;
import com.henh.testman.users.request.UserUpdateReq;

import java.util.Optional;

public interface UserService {

    Optional<User> insertUser(UserInsertReq userInsertReq);

    Optional<User> login(UserLoginReq userLoginReq);

    Optional<User> selectUser(String UserId);

    Optional<String> deleteUser(String UserId);

    Optional<User> updateUser(UserUpdateReq userUpdateReq, String userId);

}
