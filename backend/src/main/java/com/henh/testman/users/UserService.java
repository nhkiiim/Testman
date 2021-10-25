package com.henh.testman.users;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.henh.testman.common.errors.NotFoundException;

import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Transactional
    public User login(Email email, String password) {
        checkNotNull(password, "password must be provided");
        User user = findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Could not found user for " + email));
//        user.login(passwordEncoder, password);
        return user;
    }

    @Transactional(readOnly = true)
    public Optional<User> findById(String userId) {
        checkNotNull(userId, "userId must be provided");

        return userRepository.findById(userId);
    }

    @Transactional(readOnly = true)
    public Optional<User> findByEmail(Email email) {
        checkNotNull(email, "email must be provided");

        return userRepository.findByEmail(email);
    }

}