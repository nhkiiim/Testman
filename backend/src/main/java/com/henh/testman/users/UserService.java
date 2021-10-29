package com.henh.testman.users;

import com.henh.testman.users.request.LoginRequest;

import java.util.Optional;

public interface UserService {

    Optional<User> login(LoginRequest loginRequest);

    Optional<User> selectUser(String id);

}
