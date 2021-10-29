package com.henh.testman.users;

import com.henh.testman.utils.BaseEntity;
import lombok.*;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.persistence.Entity;
import java.util.Objects;

@Entity
@Getter
@Builder
@NoArgsConstructor
public class User extends BaseEntity {

    private Long seq;

    private String id;

    private String password;

    private String email;

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
                .append("id", id)
                .append("email", email)
                .append("password", "[PROTECTED]")
                .toString();
    }
}