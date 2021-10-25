package com.henh.testman.users;

import com.henh.testman.errors.NotFoundException;
import com.henh.testman.errors.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Optional<User> login(String userId, String password) {
        checkNotNull(userId, "userId must be provided");
        checkNotNull(password, "password must be provided");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Could not found user for " + userId));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UnauthorizedException("passwords do not match");
        }

        return Optional.of(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(String userId) {
        checkNotNull(userId, "userId must be provided");

        return userRepository.findById(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findByEmail(Email email) {
        checkNotNull(email, "email must be provided");

        return userRepository.findByEmail(email);
    }

}