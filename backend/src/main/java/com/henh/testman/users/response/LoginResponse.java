package com.henh.testman.users.response;

import com.henh.testman.users.UserDto;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@AllArgsConstructor
public class LoginResponse {

    private final String token;

    private final UserDto user;

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("token", token)
                .append("user", user)
                .toString();
    }

}