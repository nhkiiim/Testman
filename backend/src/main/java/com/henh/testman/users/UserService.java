package com.henh.testman.users;

import com.henh.testman.users.request.LoginRequest;
import com.henh.testman.users.request.UserRegistRequest;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public interface UserService {

    Optional<User> insertUser(UserRegistRequest userRegistRequest);

    Optional<User> login(LoginRequest loginRequest);

    Optional<User> selectUser(String id);

    Optional<String> deleteUser(String id);

}
