package com.henh.testman.load_result;

import com.henh.testman.results.load_results.LoadResult;
import com.henh.testman.results.load_results.LoadResultRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class LoadRestControllerTest {

    @Autowired
    LoadResultRepository loadResultRepository;

    @Test
    public void basicCrudOperations() {

//        Iterable<LoadResult> findPerson = loadResultRepository.findAll();
//
//        List<LoadResult> list = Lists.newArrayList(findPerson);
//
//        for (LoadResult l : list) {
//            System.out.println(l.toString());
//        }
//
//        List<LoadResult> result = loadResultRepository.findAllByUserIdAndHistorySeq("heung", 1L);
//        System.out.println(result.toString());

        List<LoadResult> list = loadResultRepository.findAllByUserIdAndHistorySeq("heung", 1L);
        loadResultRepository.deleteAll(list);

        System.out.println(list.size());
    }
}
