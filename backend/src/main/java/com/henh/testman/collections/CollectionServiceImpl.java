package com.henh.testman.collections;

import com.henh.testman.collections.request.CollectionInsertReq;
import com.henh.testman.collections.request.CollectionUpdateReq;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.workspaces.Workspace;
import com.henh.testman.workspaces.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<CollectionDto> selectCollection(Long workspaceSeq) {
        List<Collection> collections = collectionRepository.findByWorkspaceSeq(workspaceSeq);
        return collections.stream().map(CollectionDto::new).collect(Collectors.toList());
    }

    @Override
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
    public Optional<Collection> updateCollection(CollectionUpdateReq collectionUpdateReq) {
        Collection collection = collectionRepository.findById(collectionUpdateReq.getSeq())
                .orElseThrow(() -> new NotFoundException("could not found collection"));

        collection.setName(collectionUpdateReq.getName());
        collectionRepository.save(collection);
        return Optional.of(collection);
    }

    @Override
    public Optional<String> deleteCollection(Long seq) {
        Collection collection = collectionRepository.findById(seq)
                .orElseThrow(() -> new NotFoundException("could not found collection"));

        collectionRepository.delete(collection);
        return Optional.of(collection.getName());
    }

}
