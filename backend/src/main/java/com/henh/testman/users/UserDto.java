package com.henh.testman.users;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@Getter
@Setter
public class UserDto {

    private String id;

    private String email;

    public UserDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("id", id)
                .append("email", email)
                .toString();
    }

}