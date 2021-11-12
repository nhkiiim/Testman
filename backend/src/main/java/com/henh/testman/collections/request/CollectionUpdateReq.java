package com.henh.testman.collections.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class CollectionUpdateReq {

    @NotNull(message = "seq must be provided")
    private Long seq;

    @NotBlank(message = "name must be provided")
    private String name;

}
