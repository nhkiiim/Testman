package com.henh.testman.users;

import java.util.Optional;

public interface UserRepository {

    Optional<User> findById(String userId);

    Optional<User> findByEmail(Email email);

}