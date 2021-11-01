package com.henh.testman.users.response;

import com.henh.testman.users.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class LoginResponse {

    private final String token;

    private final UserDto user;

}