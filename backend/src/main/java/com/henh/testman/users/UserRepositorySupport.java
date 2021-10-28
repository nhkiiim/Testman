package com.henh.testman.users;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositorySupport {

	private final JPAQueryFactory jpaQueryFactory;

	private final QUser qUser = QUser.user;

	@Autowired
	public UserRepositorySupport(JPAQueryFactory jpaQueryFactory) {
		this.jpaQueryFactory = jpaQueryFactory;
	}

}
