package com.henh.testman.load_result;

import com.henh.testman.results.load_results.LoadResult;
import com.henh.testman.results.load_results.LoadResultRepository;
import org.assertj.core.util.Lists;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@SpringBootTest
public class LoadRestControllerTest {

    @Autowired
    LoadResultRepository loadResultRepository;

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
