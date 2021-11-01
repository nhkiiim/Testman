package com.henh.testman.common.utils;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.Objects;

/**
 * 모델 간 공통 사항 정의.
 */
@Getter
@Setter
@MappedSuperclass
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD:backend/src/main/java/com/henh/testman/utils/BaseEntity.java
    Long seq;
=======
    protected Long seq;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseEntity baseEntity = (BaseEntity) o;
        return Objects.equals(seq, baseEntity.seq);
    }
>>>>>>> 07c6973acceb65965e63db7d939cb9c18293f590:backend/src/main/java/com/henh/testman/common/utils/BaseEntity.java

}
