package com.henh.testman.users;


import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.errors.UnauthorizedException;

import com.henh.testman.common.errors.ExistException;
import com.henh.testman.users.request.UserLoginReq;
import com.henh.testman.users.request.UserRegistReq;
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
    @Transactional(rollbackFor = Exception.class)
    public Optional<User> insertUser(UserRegistReq userRegistReq) {
        Optional<User> checkUser = userRepository.findById(userRegistReq.getId());
        if(checkUser.isPresent()) throw new ExistException("Exist id");

        User user = User.builder()
                .id(userRegistReq.getId())
                .password(passwordEncoder.encode(userRegistReq.getPassword()))
                .email(userRegistReq.getEmail())
                .build();
        userRepository.save(user);
        return Optional.of(user);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<User> login(UserLoginReq userLoginReq) {
        User user = userRepository.findById(userLoginReq.getId())
                .orElseThrow(() -> new NotFoundException("Could not found user for " + userLoginReq.getId()));

        if (!passwordEncoder.matches(userLoginReq.getPassword(), user.getPassword())) {
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

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<String> deleteUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not found user for " + id));
        userRepository.delete(user);
        return Optional.of(user.getId());
    }

}