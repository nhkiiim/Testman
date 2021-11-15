package com.henh.testman.workspaces;

import com.henh.testman.common.errors.ExistException;
import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.results.load_results.LoadResultServiceImpl;
import com.henh.testman.users.User;
import com.henh.testman.users.UserRepository;
import com.henh.testman.workspaces.request.WorkspaceInsertReq;
import com.henh.testman.workspaces.request.WorkspaceUpdateReq;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    private static final Logger logger = LoggerFactory.getLogger(LoadResultServiceImpl.class);

    private final WorkspaceRepository workspaceRepository;

    private final WorkspaceRepositorySupport workspaceRepositorySupport;

    private final UserRepository userRepository;

    @Autowired
    public WorkspaceServiceImpl(WorkspaceRepository workspaceRepository,
                                WorkspaceRepositorySupport workspaceRepositorySupport, UserRepository userRepository){
        this.workspaceRepository = workspaceRepository;
        this.workspaceRepositorySupport = workspaceRepositorySupport;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Workspace> insertWorkspace(WorkspaceInsertReq workspaceInsertReq, String userId) {
        checkNotNull(userId, "userId must be provided");

        Optional<Workspace> checkWorkspace = workspaceRepository.findByTitle(workspaceInsertReq.getTitle());
        if(checkWorkspace.isPresent()) throw new ExistException("Exist title");

        User user = userRepository.findByUserId(userId)
                .orElseThrow(()-> new NotFoundException("Could not found user for " + userId));

        String imgName = saveFile(workspaceInsertReq.getImg(), workspaceInsertReq.getTitle(), userId);

        return Optional.of(
                workspaceRepository.save(
                        Workspace.builder()
                        .user(user)
                        .url(workspaceInsertReq.getUrl())
                        .title(workspaceInsertReq.getTitle())
                        .description(workspaceInsertReq.getDescription())
                        .createDate(LocalDateTime.now())
                        .imgName(imgName)
                        .build()
                )
        );
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Workspace> selectWorkspace(Long seq) {
        checkNotNull(seq, "seq must be provided");
        return workspaceRepository.findBySeq(seq);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkspaceDto> selectWorkspaceByUserId(String userId) {
        checkNotNull(userId, "userId must be provided");
        return workspaceRepositorySupport.findByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public Integer countWorkspaceByUserId(String userId) {
        checkNotNull(userId, "userId must be provided");
        return workspaceRepository.countByUserUserId(userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Workspace> updateWorkspace(WorkspaceUpdateReq workspaceUpdateReq, String userId){
        Workspace workspace = workspaceRepository.findBySeq(workspaceUpdateReq.getSeq())
                .orElseThrow(()-> new NotFoundException("Could not found workspace seq "+ workspaceUpdateReq.getSeq()));

        String fileName = saveFile(workspaceUpdateReq.getImg(), workspaceUpdateReq.getTitle(), userId);

        workspace.update(workspaceUpdateReq, fileName);

        return Optional.of(
                workspaceRepository.save(workspace)
        );
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<String> deleteWorkspace(Long seq){
        Workspace workspace = workspaceRepository.findBySeq(seq)
                .orElseThrow(()-> new NotFoundException("Could not found workspace seq " + seq));
        workspaceRepository.delete(workspace);
        return Optional.of(workspace.getTitle());
    }

    private String saveFile(MultipartFile img, String title, String userId) {
        if (img == null) {
            return null;
        }
        String imgName = title + "_" + img.getOriginalFilename();
        String imgPath = "/static/images/" + userId + "/" + imgName;

        try {
            File file = new File(imgPath);
            if (!file.exists()) {
                if (file.mkdirs()) {
                    logger.info("succeed to create folder");
                } else {
                    logger.info("Failed to create folder");
                }
            }
            img.transferTo(file);
            return imgName;
        } catch (IOException e) {
            throw new NotFoundException("failed to save img");
        }
    }

}
