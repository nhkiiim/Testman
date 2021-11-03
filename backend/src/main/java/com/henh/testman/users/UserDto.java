package com.henh.testman.users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@Getter
@Setter
@ToString
public class UserDto {

    private String userId;

    private String email;

    public UserDto(User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
    }

}