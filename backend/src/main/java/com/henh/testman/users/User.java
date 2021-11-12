package com.henh.testman.users;

import com.henh.testman.common.utils.BaseEntity;
import lombok.*;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity {

    private String userId;

    private String password;

    private String email;

    public void update(String password, String email){
        this.password = password;
        this.email = email;
    }

}