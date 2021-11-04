package com.henh.testman.collections;

import com.henh.testman.collections.request.CollectionDeleteReq;
import com.henh.testman.collections.request.CollectionInsertReq;
import com.henh.testman.collections.request.CollectionSelectReq;
import com.henh.testman.collections.request.CollectionUpdateReq;

import java.util.List;
import java.util.Optional;

public interface CollectionService {

    List<CollectionDto> selectCollection(CollectionSelectReq collectionSelectReq);

    Optional<Collection> insertCollection(CollectionInsertReq collectionInsertReq);

    Optional<Collection> updateCollection(CollectionUpdateReq collectionUpdateReq);

    Optional<String> deleteCollection(CollectionDeleteReq collectionDeleteReq);

}
