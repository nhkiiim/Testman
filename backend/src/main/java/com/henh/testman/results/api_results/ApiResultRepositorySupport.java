package com.henh.testman.results.api_results;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ApiResultRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

//    private final QApiResult qApiReulst = QApiResult.apiResult;

    @Autowired
    public ApiResultRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

}
