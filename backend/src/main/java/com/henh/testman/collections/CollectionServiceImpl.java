package com.henh.testman.collections;

import com.henh.testman.collections.request.CollectionInsertReq;
import com.henh.testman.collections.request.CollectionUpdateReq;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.workspaces.Workspace;
import com.henh.testman.workspaces.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class CollectionServiceImpl implements CollectionService {

    private final CollectionRepository collectionRepository;

    private final WorkspaceRepository workspaceRepository;

    @Autowired
    public CollectionServiceImpl(CollectionRepository collectionRepository, WorkspaceRepository workspaceRepository) {
        this.collectionRepository = collectionRepository;
        this.workspaceRepository = workspaceRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CollectionDto> selectCollection(Long workspaceSeq) {
        checkNotNull(workspaceSeq, "workspaceSeq must be provided");
        List<Collection> collections = collectionRepository.findByWorkspaceSeq(workspaceSeq);

        return collections.stream().map(CollectionDto::new).collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Collection> insertCollection(CollectionInsertReq collectionInsertReq) {
        Workspace workspace = workspaceRepository.findById(collectionInsertReq.getWorkspaceSeq())
                .orElseThrow(() -> new NotFoundException("could not found workspace"));

        return Optional.of(
                collectionRepository.save(
                        Collection.builder()
                                .workspaceSeq(workspace.getSeq())
                                .name(collectionInsertReq.getName())
                                .build()
                )
        );
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Collection> updateCollection(CollectionUpdateReq collectionUpdateReq) {
        Collection collection = collectionRepository.findById(collectionUpdateReq.getSeq())
                .orElseThrow(() -> new NotFoundException("could not found collection"));

        collection.setName(collectionUpdateReq.getName());
        return Optional.of(
                collectionRepository.save(collection)
        );
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<String> deleteCollection(Long seq) {
        checkNotNull(seq, "seq must be provided");
        Collection collection = collectionRepository.findById(seq)
                .orElseThrow(() -> new NotFoundException("could not found collection"));

        collectionRepository.delete(collection);
        return Optional.of(collection.getName());
    }

}
