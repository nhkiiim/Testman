package com.henh.testman.users;

import com.henh.testman.common.utils.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.persistence.Entity;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class User extends BaseEntity {

    private String id;

    private String password;

    private String email;

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("id", id)
                .append("email", email)
                .append("password", "[PROTECTED]")
                .toString();
    }

}