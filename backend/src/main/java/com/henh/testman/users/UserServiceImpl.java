package com.henh.testman.users;

import com.henh.testman.errors.ExistException;
import com.henh.testman.errors.NotFoundException;
import com.henh.testman.errors.UnauthorizedException;
import com.henh.testman.users.request.LoginRequest;
import com.henh.testman.users.request.UserRegistRequest;
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
    public Optional<User> insertUser(UserRegistRequest userRegistRequest) {
        Optional<User> check = selectUser(userRegistRequest.getUserId());
        if(check.isPresent()) throw new ExistException("exist value");

        User user = User.builder()
                .id(userRegistRequest.getUserId())
                .password(passwordEncoder.encode(userRegistRequest.getPassword()))
                .email(userRegistRequest.getEmail())
                .build();
        userRepository.save(user);

        return Optional.of(user);
    }

    @Override
    @Transactional
    public Optional<User> login(LoginRequest loginRequest) {

        User user = userRepository.findById(loginRequest.getUserId())
                .orElseThrow(() -> new NotFoundException("Could not found user for " + loginRequest.getUserId()));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
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