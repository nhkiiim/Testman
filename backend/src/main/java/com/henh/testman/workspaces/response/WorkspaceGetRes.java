package com.henh.testman.workspaces.response;

import com.henh.testman.workspaces.WorkspaceDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;


@Getter
@Setter
@ToString
@AllArgsConstructor
public class WorkspaceGetRes {

    WorkspaceDto workspaceDto;

}
