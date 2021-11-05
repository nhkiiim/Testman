package com.henh.testman.uri_info;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UriInfoRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    private final QUriInfo qUriInfo = QUriInfo.uriInfo;

    @Autowired
    public UriInfoRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    List<UriInfoDto> findByUserAndCollection(String id, Long collection_seq){
        List<UriInfoDto> UriInfoDtoList = jpaQueryFactory
                .select(Projections.constructor(UriInfoDto.class,qUriInfo.seq, qUriInfo.workspace.seq, qUriInfo.collectionSeq,
                        qUriInfo.path, qUriInfo.httpMethod, qUriInfo.port, qUriInfo.params, qUriInfo.headers, qUriInfo.authorization, qUriInfo.creatDate))
                .from(qUriInfo)
                .where(qUriInfo.workspace.user.userId.eq(id), qUriInfo.collectionSeq.eq(collection_seq))
                .fetch();
        return UriInfoDtoList;
    }

}
