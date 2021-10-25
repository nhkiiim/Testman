package com.henh.testman.users;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static java.util.Optional.ofNullable;

@Repository
public class JdbcUserRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public JdbcUserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public Optional<User> findById(String userId) {
        List<User> results = jdbcTemplate.query(
                "SELECT * FROM users WHERE userId=?",
                mapper,
                userId
        );
        return ofNullable(results.isEmpty() ? null : results.get(0));
    }

    @Override
    public Optional<User> findByEmail(Email email) {
        List<User> results = jdbcTemplate.query(
                "SELECT * FROM users WHERE email=?",
                mapper,
                email.getAddress()
        );
        return ofNullable(results.isEmpty() ? null : results.get(0));
    }

    static RowMapper<User> mapper = (rs, rowNum) ->
            new User.UserBuilder()
                    .seq(rs.getLong("seq"))
                    .userId(rs.getString("userId"))
                    .name(rs.getString("name"))
                    .email(new Email(rs.getString("email")))
                    .password(rs.getString("passwd"))
                    .build();

}