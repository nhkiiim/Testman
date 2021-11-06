package com.henh.testman.results.load_results;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.results.load_results.request.LoadPostReq;
import com.henh.testman.results.load_results.response.LoadDeleteRes;
import com.henh.testman.results.load_results.response.LoadInsertRes;
import com.henh.testman.results.load_results.response.LoadSelectRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.henh.testman.common.utils.ApiUtils.success;

@RestController
@RequestMapping(path = "api/load-results")
public class LoadResultRestController {

    private final LoadResultService loadResultService;

    @Autowired
    public LoadResultRestController(LoadResultService loadResultService) {
        this.loadResultService = loadResultService;
    }

    @PostMapping
    public ApiResult<LoadInsertRes> insertLoad(@Valid LoadPostReq loadPostReq) {
        return success(
            new LoadInsertRes(
                loadResultService.insertLoad(loadPostReq)
                    .map(LoadResultDto::new)
                    .orElseThrow(() -> new NotFoundException("fail work"))
            )
        );
    }

    @GetMapping("{userId}/{uriInfoSeq}")
    public ApiResult<LoadSelectRes> selectLoad(@PathVariable String userId, Long uriInfoSeq) {
        return success(
                new LoadSelectRes(
                        loadResultService.selectLoad(userId, uriInfoSeq)
                )
        );
    }

    @DeleteMapping
    public ApiResult<LoadDeleteRes> deleteLoad(@PathVariable String userId, Long uriInfoSeq) {
        return success(
                new LoadDeleteRes(
                        loadResultService.deleteLoad(userId, uriInfoSeq)
                )
        );
    }

}
