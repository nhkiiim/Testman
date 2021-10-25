package com.henh.testman.users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@Getter
@Setter
@AllArgsConstructor
public class UserDto {

    private String userId;

    private String password;

    private String name;

    private Email email;

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("userId", userId)
                .append("password", password)
                .append("name", name)
                .append("email", email)
                .toString();
    }

}