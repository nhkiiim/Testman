package com.henh.testman.collections.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class CollectionDeleteReq {

    @NotNull(message = "seq must be provided")
    private Long seq;

}
