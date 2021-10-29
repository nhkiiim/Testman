package com.henh.testman.results.load_results_raw;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class LoadResultRawRepositorySupport {

    private JPAQueryFactory jpaQueryFactory;

    private final QLoadReulstRaw qLoadReulstRaw = QLoadReulstRaw.loadReulstRaw;

    public LoadResultRawRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

}
