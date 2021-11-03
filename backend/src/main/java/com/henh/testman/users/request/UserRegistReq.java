package com.henh.testman.users.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class UserRegistReq {

    @NotBlank(message = "userId must be provided")
    private String userId;

    @NotBlank(message = "password must be provided")
    private String password;

    @NotBlank(message = "email must be provided")
    private String email;

}
