package com.henh.testman.uri_info.response;

import com.henh.testman.uri_info.UriInfoDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class UriInfoSelectAllRes {

    List<UriInfoDto> UriInfoDtoList;

}
