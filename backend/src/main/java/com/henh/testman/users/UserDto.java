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

    private String id;

    private String email;

    public UserDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
    }

}