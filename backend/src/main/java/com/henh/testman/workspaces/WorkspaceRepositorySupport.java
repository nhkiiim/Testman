package com.henh.testman.workspaces;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WorkspaceRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    private final QWorkspace qWorkspace = QWorkspace.workspace;

    @Autowired
    public WorkspaceRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    List<WorkspaceDto> findByUserId(String id){
        List<WorkspaceDto> workspaceDtoList = jpaQueryFactory
                .select(Projections.constructor(WorkspaceDto.class,qWorkspace.seq, qWorkspace.user.userId, qWorkspace.title,
                        qWorkspace.url, qWorkspace.description, qWorkspace.img, qWorkspace.createDate))
                .from(qWorkspace)
                .where(qWorkspace.user.userId.eq(id))
                .fetch();
        return workspaceDtoList;
    }

}
