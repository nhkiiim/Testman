package com.henh.testman.histories;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HistoryRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    private final QHistory qHistory = QHistory.history;

    @Autowired
    public HistoryRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    List<HistoryDto> findByUserId(String id){
        List<HistoryDto> historyDtoList = jpaQueryFactory
                .select(Projections.constructor(HistoryDto.class,qHistory.seq, qHistory.workspace.seq, qHistory.path,
                        qHistory.httpMethod, qHistory.port, qHistory.params, qHistory.headers, qHistory.authorization, qHistory.creatDate))
                .from(qHistory)
                .where(qHistory.workspace.user.userId.eq(id))
                .fetch();
        return historyDtoList;
    }

}
