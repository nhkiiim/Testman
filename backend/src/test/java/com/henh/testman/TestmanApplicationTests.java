package com.henh.testman;

import com.henh.testman.results.load_results.LoadResult;
import com.henh.testman.results.load_results.LoadResultRepository;
import org.assertj.core.util.Lists;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;


@SpringBootTest
class TestmanApplicationTests {

    @Autowired
    LoadResultRepository loadResultRepository;

    @Test
    void contextLoads() {
    }

    @Test
    public void basicCrudOperations() {

        Iterable<LoadResult> findPerson = loadResultRepository.findAll();

        List<LoadResult> list = Lists.newArrayList(findPerson);

        for (LoadResult l : list) {
            System.out.println(l.toString());
        }

        Optional<LoadResult> result = loadResultRepository.findByUserId("heung");

        System.out.println(result.toString());
    }

}
