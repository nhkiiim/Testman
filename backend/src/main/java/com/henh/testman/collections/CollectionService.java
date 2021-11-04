package com.henh.testman.collections;

import com.henh.testman.collections.request.CollectionInsertReq;
import com.henh.testman.collections.request.CollectionUpdateReq;

import java.util.List;
import java.util.Optional;

public interface CollectionService {

    List<CollectionDto> selectCollection(Long workspaceSeq);

    Optional<Collection> insertCollection(CollectionInsertReq collectionInsertReq);

    Optional<Collection> updateCollection(CollectionUpdateReq collectionUpdateReq);

    Optional<String> deleteCollection(Long seq);

}
