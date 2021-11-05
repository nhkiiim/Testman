package com.henh.testman.collections;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class CollectionRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    private final QCollection qCollection = QCollection.collection;

    @Autowired
    public CollectionRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

}
