package com.henh.testman.results.load_results;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.results.load_results.request.LoadInsertReq;
import com.henh.testman.results.load_results.response.LoadDeleteRes;
import com.henh.testman.results.load_results.response.LoadInsertRes;
import com.henh.testman.results.load_results.response.LoadSelectAllRes;
import com.henh.testman.results.load_results.response.LoadSelectRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.henh.testman.common.utils.ApiUtils.success;

@RestController
@RequestMapping(path = "api/load-result")
public class LoadResultRestController {

    private final LoadResultService loadResultService;

    @Autowired
    public LoadResultRestController(LoadResultService loadResultService) {
        this.loadResultService = loadResultService;
    }

    @PostMapping
    public ApiResult<LoadInsertRes> insertLoad(@Valid @RequestBody LoadInsertReq loadInsertReq) {
        return success(
                new LoadInsertRes(
                        loadResultService.insertLoad(loadInsertReq)
                                .map(LoadResultDto::new)
                                .orElseThrow(() -> new NotFoundException("fail insert for load"))
                )
        );
    }

    @GetMapping("{seq}")
    public ApiResult<LoadSelectRes> selectLoad(@PathVariable Long seq) {
        return success(
                new LoadSelectRes(
                        loadResultService.selectLoad(seq)
                                .map(LoadResultDto::new)
                                .orElseThrow(() -> new NotFoundException("fail select for load"))
                )
        );
    }

    @GetMapping("list/{tabSeq}")
    public ApiResult<LoadSelectAllRes> selectLoadByTabSeq(@PathVariable Long tabSeq) {
        return success(
                new LoadSelectAllRes(
                        loadResultService.selectLoadByTabSeq(tabSeq)
                )
        );
    }

    @DeleteMapping("{tabSeq}")
    public ApiResult<LoadDeleteRes> deleteLoad(@PathVariable Long tabSeq) {
        return success(
                new LoadDeleteRes(
                        loadResultService.deleteLoad(tabSeq)
                )
        );
    }

}
