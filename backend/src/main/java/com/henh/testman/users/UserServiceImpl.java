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

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public Optional<User> login(String id, String password) {
        checkNotNull(id, "userId must be provided");
        checkNotNull(password, "password must be provided");

        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not found user for " + id));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UnauthorizedException("passwords do not match");
        }

        return Optional.of(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> selectUser(String id) {
        checkNotNull(id, "userId must be provided");

        return userRepository.findById(id);
    }

}