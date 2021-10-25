package com.henh.testman.users;

import lombok.Builder;
import lombok.Getter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;

@Getter
@Builder
public class User {

    private final Long seq;

    private final String userId;

    private final String password;

    private final String name;

    private final Email email;

    public User(String userId, String password, String name, Email email) {
        this(null, userId, password, name, email);
    }

    public User(Long seq, String userId, String password, String name, Email email) {
        checkArgument(isNotEmpty(name), "name must be provided");
        checkArgument(
                name.length() >= 1 && name.length() <= 10,
                "name length must be between 1 and 10 characters"
        );
        checkNotNull(password, "password must be provided");
        checkNotNull(email, "email must be provided");

        this.seq = seq;
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(seq, user.seq);
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("seq", seq)
                .append("userId", userId)
                .append("name", name)
                .append("email", email)
                .append("password", "[PROTECTED]")
                .toString();
    }
}