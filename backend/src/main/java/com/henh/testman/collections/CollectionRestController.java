package com.henh.testman.collections;


import com.henh.testman.collections.request.CollectionDeleteReq;
import com.henh.testman.collections.request.CollectionInsertReq;
import com.henh.testman.collections.request.CollectionSelectReq;
import com.henh.testman.collections.request.CollectionUpdateReq;
import com.henh.testman.collections.response.CollectionDeleteRes;
import com.henh.testman.collections.response.CollectionInsertRes;
import com.henh.testman.collections.response.CollectionSelectRes;
import com.henh.testman.collections.response.CollectionUpdateRes;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static com.henh.testman.common.utils.ApiUtils.success;

@RestController
@RequestMapping("api/collections")
public class CollectionRestController {

    private final CollectionService collectionService;

    @Autowired
    public CollectionRestController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ApiResult<CollectionSelectRes> selectCollection(Authentication authentication, CollectionSelectReq collectionSelectReq) {
        return success(
                new CollectionSelectRes (
                        collectionService.selectCollection(collectionSelectReq)
                )
        );
    }

    @PostMapping
    public ApiResult<CollectionInsertRes> insertCollection(Authentication authentication, CollectionInsertReq collectionInsertReq) {
        return success(
                new CollectionInsertRes (
                        collectionService.insertCollection(collectionInsertReq)
                                .map(CollectionDto::new)
                                .orElseThrow(() -> new NotFoundException("Could not found collection"))
                )
        );
    }

    @PatchMapping
    public ApiResult<CollectionUpdateRes> updateCollection(Authentication authentication, CollectionUpdateReq collectionUpdateReq) {
        return success(
                new CollectionUpdateRes (
                        collectionService.updateCollection(collectionUpdateReq)
                                .map(CollectionDto::new)
                                .orElseThrow(() -> new NotFoundException("Could not found collection"))
                )
        );
    }

    @DeleteMapping
    public ApiResult<CollectionDeleteRes> deleteCollection(Authentication authentication, CollectionDeleteReq collectionDeleteReq) {
        return success(
                new CollectionDeleteRes (
                        collectionService.deleteCollection(collectionDeleteReq)
                                .orElseThrow(() -> new NotFoundException("Could not found collection"))
                )
        );
    }

}
