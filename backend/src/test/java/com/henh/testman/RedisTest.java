package com.henh.testman;

import com.henh.testman.common.config.RedisConfig;
import com.henh.testman.results.load_results.LoadRepository;
import com.henh.testman.results.load_results.Person;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Optional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = RedisConfig.class)
public class RedisTest {

    @Autowired
    LoadRepository loadRepository;

    @Test
    public void basicCrudOperations() {
        Person person = new Person(null, "an", "heung", "naver.com");

        Person savePerson = loadRepository.save(person);

        Optional<Person> findPerson = loadRepository.findById(savePerson.getId());

        System.out.println(findPerson.toString());

//        assertThat(findPerson.isPresent()).isEqualTo(Boolean.TRUE);
//        assertThat(findPerson.get().getFirstname()).isEqualTo(person.getFirstname());
    }

}
