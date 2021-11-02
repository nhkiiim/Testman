package com.henh.testman.results.load_results;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("people")
@Data
public class Person {

    @Id
    Long id;

    String firstname;

    String lastname;

    String address;

    public Person(Long id, String firstname, String lastname, String address) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
    }

}
