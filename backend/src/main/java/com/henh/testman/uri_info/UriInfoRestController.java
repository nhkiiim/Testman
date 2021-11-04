package com.henh.testman.uri_info;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.uri_info.request.UriInfoRegistReq;
import com.henh.testman.uri_info.response.UriInfoSelectAllRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static com.henh.testman.common.utils.ApiUtils.success;

@RestController
@RequestMapping("api/uri_info")
public class UriInfoRestController {

    private final UriInfoService uriInfoService;

    @Autowired
    public UriInfoRestController(UriInfoService uriInfoService) {
        this.uriInfoService = uriInfoService;
    }

    @PostMapping
    public ApiResult<UriInfoDto> insertUriInfo(@RequestBody UriInfoRegistReq uriInfoRegistReq){
        return success(
                uriInfoService.insertUriInfo(uriInfoRegistReq)
                        .map(UriInfoDto::new)
                        .orElseThrow(() -> new IllegalArgumentException("Could not regist history"))
        );
    }

    @GetMapping("{seq}")
    public ApiResult<UriInfoDto> selectUriInfo(@PathVariable Long seq){
        return success(
                uriInfoService.selectUriInfo(seq)
                        .map(UriInfoDto::new)
                        .orElseThrow(() -> new NotFoundException("Could not found history seq" + seq))
        );
    }

    @GetMapping
    public ApiResult<UriInfoSelectAllRes> selectUriInfoByUser(Authentication authentication){
        return success(
                new UriInfoSelectAllRes(
                        uriInfoService.selectUriInfoByUserId(authentication.getName())
                )
        );
    }

}
