package com.henh.testman.results.load_results_summary;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LoadResultSummaryRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

//    private final QLoadResultSummary qLoadResultSummary = QLoadResultSummary.loadResultSummary;

    @Autowired
    public LoadResultSummaryRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
}
