package com.henh.testman.uri_info;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.uri_info.request.UriInfoRegistReq;
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
    public Optional<UriInfo> insertUriInfo(UriInfoRegistReq uriInfoRegistReq) {
        Workspace workspace = workspaceRepository.findBySeq(uriInfoRegistReq.getWorkspace_seq())
                .orElseThrow(() -> new NotFoundException("Could not found workspace seq" + uriInfoRegistReq.getWorkspace_seq()));

        UriInfo uriInfo = UriInfo.builder()
                .workspace(workspace)
                .collection_seq(uriInfoRegistReq.getCollection_seq())
                .httpMethod(uriInfoRegistReq.getHttpMethod())
                .path(uriInfoRegistReq.getPath())
                .port(uriInfoRegistReq.getPort())
                .headers(uriInfoRegistReq.getHeaders())
                .params(uriInfoRegistReq.getParams())
                .authorization(uriInfoRegistReq.getAuthorization())
                .creatDate(LocalDateTime.now())
                .build();
        uriInfoRepository.save(uriInfo);
        return Optional.of(uriInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UriInfo> selectUriInfo(Long seq) {
        checkNotNull(seq, "seq must be provided");
        return uriInfoRepository.findBySeq(seq);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UriInfoDto> selectUriInfoByUserId(String userId) {
        checkNotNull(userId, "userId must be provided");
        List<UriInfoDto> uriInfoDtoList = uriInfoRepositorySupport.findByUserId(userId);
        if(uriInfoDtoList.isEmpty()) throw new NotFoundException("Could not found history for "+ userId);
        return uriInfoDtoList;
    }

}
