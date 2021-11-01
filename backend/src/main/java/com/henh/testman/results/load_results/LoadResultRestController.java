package com.henh.testman.results.load_results;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils;
import com.henh.testman.results.load_results.request.WorkRequest;
import com.henh.testman.results.load_results.response.WorkResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping(path = "work")
    public ApiUtils.ApiResult<WorkResponse> work(@Valid WorkRequest workRequest) {
        System.out.println(workRequest.toString());
        return success(
            new WorkResponse(
                loadResultService.work(workRequest)
                    .map(LoadResultDto::new)
                    .orElseThrow(() -> new NotFoundException("fail work"))
            )
        );
    }

}
