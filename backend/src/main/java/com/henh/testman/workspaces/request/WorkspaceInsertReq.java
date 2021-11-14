package com.henh.testman.workspaces.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class WorkspaceInsertReq {

    @NotBlank(message = "title must be provided")
    private String title;

    @NotBlank(message = "url must be provided")
    private String url;

    private String description;

    private MultipartFile img;

}
