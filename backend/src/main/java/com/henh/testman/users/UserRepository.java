package com.henh.testman.users;

import java.util.Optional;

public interface UserRepository {

    void update(User user);

    Optional<User> findById(String userId);

    Optional<User> findByEmail(Email email);

}