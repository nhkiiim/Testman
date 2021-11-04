package com.henh.testman.uri_info;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.uri_info.request.UriInfoInsertReq;
import com.henh.testman.uri_info.request.UriInfoUpdateReq;
import com.henh.testman.uri_info.response.UriInfoDeleteRes;
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
    public ApiResult<UriInfoDto> insertUriInfo(@RequestBody UriInfoInsertReq uriInfoInsertReq){
        return success(
                uriInfoService.insertUriInfo(uriInfoInsertReq)
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

    @GetMapping("collection/{collection_seq}")
    public ApiResult<UriInfoSelectAllRes> selectUriInfoByUserAndCollection(
            Authentication authentication, @PathVariable Long collection_seq){
        return success(
                new UriInfoSelectAllRes(
                        uriInfoService.selectUriInfoByUserAndCollection(authentication.getName(),collection_seq)
                )
        );
    }

    @PatchMapping
    public ApiResult<UriInfoDto> updateUriInfo(@RequestBody UriInfoUpdateReq uriInfoUpdateReq){
        return success(
                uriInfoService.updateUriInfo(uriInfoUpdateReq)
                        .map(UriInfoDto::new)
                        .orElseThrow(() -> new NotFoundException("Could not found uri info " +uriInfoUpdateReq.getSeq()))

        );
    }

    @DeleteMapping("{seq}")
    public ApiResult<UriInfoDeleteRes> deleteUriInfo(@PathVariable Long seq){
        return success(
                new UriInfoDeleteRes(
                        uriInfoService.deleteUriInfo(seq)
                                .orElseThrow(() -> new NotFoundException("Could not found uri info " + seq))
                )
        );
    }

}
