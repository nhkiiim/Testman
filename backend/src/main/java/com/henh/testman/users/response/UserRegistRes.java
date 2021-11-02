package com.henh.testman.users.response;

import com.henh.testman.users.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class UserRegistRes {

    private final UserDto user;

}
