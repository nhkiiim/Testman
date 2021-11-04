package com.henh.testman.uri_info;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.uri_info.request.UriInfoInsertReq;
import com.henh.testman.uri_info.request.UriInfoUpdateReq;
import com.henh.testman.workspaces.Workspace;
import com.henh.testman.workspaces.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class UriInfoServiceImpl implements UriInfoService {

    private final UriInfoRepository uriInfoRepository;

    private final UriInfoRepositorySupport uriInfoRepositorySupport;

    private final WorkspaceRepository workspaceRepository;

    @Autowired
    public UriInfoServiceImpl(UriInfoRepository uriInfoRepository,
                              WorkspaceRepository workspaceRepository, UriInfoRepositorySupport uriInfoRepositorySupport) {
        this.uriInfoRepository = uriInfoRepository;
        this.workspaceRepository = workspaceRepository;
        this.uriInfoRepositorySupport = uriInfoRepositorySupport;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<UriInfo> insertUriInfo(UriInfoInsertReq uriInfoInsertReq) {
        Workspace workspace = workspaceRepository.findBySeq(uriInfoInsertReq.getWorkspace_seq())
                .orElseThrow(() -> new NotFoundException("Could not found workspace seq" + uriInfoInsertReq.getWorkspace_seq()));

        return Optional.of(
                uriInfoRepository.save(
                        UriInfo.builder()
                        .workspace(workspace)
                        .collection_seq(uriInfoInsertReq.getCollection_seq())
                        .httpMethod(uriInfoInsertReq.getHttpMethod())
                        .path(uriInfoInsertReq.getPath())
                        .port(uriInfoInsertReq.getPort())
                        .headers(uriInfoInsertReq.getHeaders())
                        .params(uriInfoInsertReq.getParams())
                        .authorization(uriInfoInsertReq.getAuthorization())
                        .creatDate(LocalDateTime.now())
                        .build()
                )
        );
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UriInfo> selectUriInfo(Long seq) {
        checkNotNull(seq, "seq must be provided");
        return uriInfoRepository.findBySeq(seq);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UriInfoDto> selectUriInfoByUserAndCollection(String userId, Long collection_seq) {
        checkNotNull(userId, "userId must be provided");
        List<UriInfoDto> uriInfoDtoList = uriInfoRepositorySupport.findByUserAndCollection(userId, collection_seq);
        if(uriInfoDtoList.isEmpty()) throw new NotFoundException("Could not found history for "+ userId);
        return uriInfoDtoList;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<UriInfo> updateUriInfo(UriInfoUpdateReq uriInfoUpdateReq) {
        UriInfo uriInfo = uriInfoRepository.findBySeq(uriInfoUpdateReq.getSeq())
                .orElseThrow(() -> new NotFoundException("Could not find uri info by " + uriInfoUpdateReq.getSeq()));

        uriInfo.update(uriInfoUpdateReq.getCollection_seq(), uriInfoUpdateReq.getPath(), uriInfoUpdateReq.getHttpMethod(),
                uriInfoUpdateReq.getPort(), uriInfoUpdateReq.getParams(), uriInfoUpdateReq.getHeaders(), uriInfoUpdateReq.getAuthorization());
        return Optional.of(
                uriInfoRepository.save(uriInfo)
        );
    }

    @Override
    public Optional<Long> deleteUriInfo(Long seq) {
        UriInfo uriInfo = uriInfoRepository.findBySeq(seq)
                .orElseThrow(() -> new NotFoundException("Could not find uri info by " + seq));

        uriInfoRepository.delete(uriInfo);
        return Optional.of(uriInfo.getSeq());
    }

}
