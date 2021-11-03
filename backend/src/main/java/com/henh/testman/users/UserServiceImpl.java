package com.henh.testman.users;


import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.errors.UnauthorizedException;

import com.henh.testman.common.errors.ExistException;
import com.henh.testman.users.request.UserLoginReq;
import com.henh.testman.users.request.UserRegistReq;
import com.henh.testman.users.request.UserUpdateReq;
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
        Optional<User> checkUser = userRepository.findById(userRegistReq.getUserId());
        if(checkUser.isPresent()) throw new ExistException("Exist userId");

        User user = User.builder()
                .userId(userRegistReq.getUserId())
                .password(passwordEncoder.encode(userRegistReq.getPassword()))
                .email(userRegistReq.getEmail())
                .build();
        userRepository.save(user);
        return Optional.of(user);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<User> login(UserLoginReq userLoginReq) {
        User user = userRepository.findById(userLoginReq.getUserId())
                .orElseThrow(() -> new NotFoundException("Could not found user for " + userLoginReq.getUserId()));

        if (!passwordEncoder.matches(userLoginReq.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("passwords do not match");
        }

        return Optional.of(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> selectUser(String userId) {
        checkNotNull(userId, "userId must be provided");
        return userRepository.findById(userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<String> deleteUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Could not found user for " + userId));
        userRepository.delete(user);
        return Optional.of(user.getUserId());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<User> updateUser(UserUpdateReq userUpdateReq, String userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Could not found user for " + userId));
        user.setEmail(userUpdateReq.getEmail());
        user.setPassword(passwordEncoder.encode(userUpdateReq.getPassword()));
        userRepository.save(user);
        return Optional.of(user);
    }

}