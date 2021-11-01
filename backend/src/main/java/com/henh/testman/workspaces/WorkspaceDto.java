package com.henh.testman.workspaces;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.time.LocalTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class WorkspaceDto {

    private String title;

    private String url;

    private String description;

    private String img;

    private LocalTime createDate;

}
