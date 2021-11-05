package com.henh.testman.histories;

import com.henh.testman.common.utils.BaseEntity;
import com.henh.testman.uri_info.UriInfo;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class History extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private UriInfo uriInfo;

}
