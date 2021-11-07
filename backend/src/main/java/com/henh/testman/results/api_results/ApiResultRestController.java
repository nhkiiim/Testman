package com.henh.testman.results.api_results;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.results.api_results.response.ApiDeleteRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.henh.testman.common.utils.ApiUtils.success;

@RestController
@RequestMapping("api/api-result")
public class ApiResultRestController {

    private final ApiResultService apiResultService;

    @Autowired
    public ApiResultRestController(ApiResultService apiResultService) {
        this.apiResultService = apiResultService;
    }


    @GetMapping("{tabSeq}")
    public ApiResult<ApiResultDto> selectApi(@PathVariable Long tabSeq) {
        return success(
                apiResultService.selectApi(tabSeq)
                        .map(ApiResultDto::new)
                        .orElseThrow(() -> new NotFoundException("fail select for load"))

        );
    }

    @DeleteMapping("{tabSeq}")
    public ApiResult<ApiDeleteRes> deleteApi(@PathVariable Long tabSeq) {
        return success(
                new ApiDeleteRes(
                        apiResultService.deleteApi(tabSeq)
                )
        );
    }

}
