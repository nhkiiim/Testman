package com.henh.testman.users.response;

import com.henh.testman.users.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class UserRegistResponse {

    private final UserDto user;

}
