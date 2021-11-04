package com.henh.testman.users;

import java.util.Optional;

public interface UserService {

    Optional<User> login(String id, String password);

    Optional<User> selectUser(String id);

}
