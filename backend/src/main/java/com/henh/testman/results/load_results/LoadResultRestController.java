package com.henh.testman.results.load_results;

import com.henh.testman.common.config.AsyncConfig;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.common.utils.AsyncTaskEtc;
import com.henh.testman.common.utils.AsyncTaskSample;
import com.henh.testman.results.load_results.request.LoadInsertReq;
import com.henh.testman.results.load_results.response.LoadDeleteRes;
import com.henh.testman.results.load_results.response.LoadInsertRes;
import com.henh.testman.results.load_results.response.LoadSelectAllRes;
import com.henh.testman.results.load_results.response.LoadSelectRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

import static com.henh.testman.common.utils.ApiUtils.success;

@RestController
@RequestMapping(path = "api/load-results")
public class LoadResultRestController {

    private final LoadResultService loadResultService;

    /** 샘플 스레드 */
    @Resource(name = "asyncTaskSample")
    private AsyncTaskSample asyncTaskSample;

    /** 기타 스레드 */
    @Resource(name = "asyncTaskEtc")
    private AsyncTaskEtc asyncTaskEtc;

    /** AsyncConfig */
    @Resource(name = "asyncConfig")
    private AsyncConfig asyncConfig;

    @Autowired
    public LoadResultRestController(LoadResultService loadResultService) {
        this.loadResultService = loadResultService;
    }

    @PostMapping
    public ApiResult<LoadInsertRes> insertLoad(@Valid @RequestBody LoadInsertReq loadInsertReq) {
//        try {


//        } catch (TaskRejectedException e) {
//            // TaskRejectedException : 개수 초과시 발생
//            System.out.println("==============>>>>>>>>>>>> THREAD ERROR");
//            System.out.println("TaskRejectedException : 등록 개수 초과");
//            System.out.println("==============>>>>>>>>>>>> THREAD END");
//        }

        LoadInsertRes loadInsertRes = null;

        if (asyncConfig.isSampleTaskExecute()) {
            asyncTaskSample.executorSample("ㄱ");
            loadInsertRes = new LoadInsertRes(
                    loadResultService.insertLoad(loadInsertReq)
                            .map(Long::new)
                            .orElseThrow(() -> new NotFoundException("fail insert for load"))
            );
        } else {
            System.out.println("==============>>>>>>>>>>>> THREAD 개수 초과");
        }

        return success(loadInsertRes);
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
