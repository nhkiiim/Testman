package com.henh.testman.workspaces;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class WorkspaceRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    private final QWorkspace qWorkspace = QWorkspace.workspace;

    @Autowired
    public WorkspaceRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

}
