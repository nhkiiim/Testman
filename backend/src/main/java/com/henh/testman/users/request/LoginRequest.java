package com.henh.testman.users.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "userId must be provided")
    private String userId;

    @NotBlank(message = "password must be provided")
    private String password;

    protected LoginRequest() {/*empty*/}

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("userId", userId)
                .append("password", password)
                .toString();
    }

}