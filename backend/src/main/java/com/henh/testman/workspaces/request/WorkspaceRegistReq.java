package com.henh.testman.workspaces.request;

import com.henh.testman.workspaces.WorkspaceDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import java.time.LocalTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class WorkspaceRegistReq {

    @NotBlank(message = "title must be provided")
    private final String title;

    @NotBlank(message = "url must be provided")
    private final String url;

    private final String description;

    private final String img;

}
