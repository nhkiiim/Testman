package com.henh.testman.results.load_results.response;

import com.henh.testman.results.load_results.LoadResultListDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class LoadSelectAllRes {

    private final List<LoadResultListDto> LoadResultList;

}
