package com.henh.testman.tabs;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TabRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    private final QTab qTab = QTab.tab;

    @Autowired
    public TabRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

}
