package com.henh.testman.users;

import java.util.Optional;

public interface UserService {

    Optional<User> login(String userId, String password);

    Optional<User> findById(String userId);

    Optional<User> findByEmail(Email email);

}
