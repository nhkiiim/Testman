package com.henh.testman.histories;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class HistoryRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    private final QHistory qHistory = QHistory.history;

    @Autowired
    public HistoryRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

//    List<HistoryDto> findByWorkspaceSeq(Long workspaceSeq) {
//        List<HistoryDto> historyDtoList = jpaQueryFactory
//                .select(qHistory)
//                .from(qHistory.uriInfo, )
//                .where(qHistory.workspace.user.userId.eq(id))
//                .fetch();
//        return historyDtoList;
//    }

}
