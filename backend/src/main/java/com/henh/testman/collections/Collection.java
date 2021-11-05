package com.henh.testman.collections;

import com.henh.testman.common.utils.BaseEntity;
import lombok.*;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Collection extends BaseEntity {

    private Long workspaceSeq;

    private String name;

}
