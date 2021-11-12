package com.henh.testman.users;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDto {

    private final String userId;

    private final String email;

    public UserDto(User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
    }

}