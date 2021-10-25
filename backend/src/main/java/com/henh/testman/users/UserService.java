package com.henh.testman.users;

import org.springframework.stereotype.Service;

import java.util.Optional;

public interface UserService {

    User login(Email email, String password);

    Optional<User> findById(String userId);

    Optional<User> findByEmail(Email email);

}
