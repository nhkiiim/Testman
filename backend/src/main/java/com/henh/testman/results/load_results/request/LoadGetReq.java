package com.henh.testman.results.load_results.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class LoadGetReq {

    @NotBlank(message = "userId must be provided")
    private String userId;

    @NotNull(message = "historySeq must be provided")
    private Long historySeq;

}
