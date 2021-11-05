package com.henh.testman.collections;


import com.henh.testman.collections.request.CollectionInsertReq;
import com.henh.testman.collections.request.CollectionUpdateReq;
import com.henh.testman.collections.response.CollectionDeleteRes;
import com.henh.testman.collections.response.CollectionInsertRes;
import com.henh.testman.collections.response.CollectionSelectRes;
import com.henh.testman.collections.response.CollectionUpdateRes;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("{workspaceSeq}")
    public ApiResult<CollectionSelectRes> selectCollection(@PathVariable Long workspaceSeq) {
        return success(
                new CollectionSelectRes (
                        collectionService.selectCollection(workspaceSeq)
                )
        );
    }

    @PostMapping
    public ApiResult<CollectionInsertRes> insertCollection(CollectionInsertReq collectionInsertReq) {
        return success(
                new CollectionInsertRes (
                        collectionService.insertCollection(collectionInsertReq)
                                .map(CollectionDto::new)
                                .orElseThrow(() -> new NotFoundException("Could not found collection"))
                )
        );
    }

    @PatchMapping
    public ApiResult<CollectionUpdateRes> updateCollection(CollectionUpdateReq collectionUpdateReq) {
        return success(
                new CollectionUpdateRes (
                        collectionService.updateCollection(collectionUpdateReq)
                                .map(CollectionDto::new)
                                .orElseThrow(() -> new NotFoundException("Could not found collection"))
                )
        );
    }

    @DeleteMapping("{seq}")
    public ApiResult<CollectionDeleteRes> deleteCollection(@PathVariable Long seq) {
        return success(
                new CollectionDeleteRes (
                        collectionService.deleteCollection(seq)
                                .orElseThrow(() -> new NotFoundException("Could not found collection"))
                )
        );
    }

}
