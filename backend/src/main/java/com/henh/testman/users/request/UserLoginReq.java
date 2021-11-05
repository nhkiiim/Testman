package com.henh.testman.users.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class UserLoginReq {

    @NotBlank(message = "Id must be provided")
    private final String userId;

    @NotBlank(message = "password must be provided")
    private final String password;

}