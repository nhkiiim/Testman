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

}
