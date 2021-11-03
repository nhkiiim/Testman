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

    private String id;

    private String password;

    private String email;

}