package com.henh.testman.results.load_results;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.results.load_results.request.LoadDeleteReq;
import com.henh.testman.results.load_results.request.LoadGetReq;
import com.henh.testman.results.load_results.request.WorkReq;
import com.henh.testman.results.load_results.response.LoadDeleteRes;
import com.henh.testman.results.load_results.response.LoadGetRes;
import com.henh.testman.results.load_results.response.WorkRes;
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
    public ApiResult<WorkRes> work(@Valid WorkReq workReq) {
        return success(
            new WorkRes(
                loadResultService.work(workReq)
                    .map(LoadResultDto::new)
                    .orElseThrow(() -> new NotFoundException("fail work"))
            )
        );
    }

    @GetMapping
    public ApiResult<LoadGetRes> getLoadResult(@Valid LoadGetReq loadGetReq) {
        return success(
                new LoadGetRes(
                        loadResultService.selectLoadResult(loadGetReq)
                )
        );
    }

    @DeleteMapping
    public ApiResult<LoadDeleteRes> deleteLoadResult(@Valid LoadDeleteReq loadDeleteReq) {
        return success(
                new LoadDeleteRes(
                        loadResultService.deleteLoadResult(loadDeleteReq)
                )
        );
    }

}
