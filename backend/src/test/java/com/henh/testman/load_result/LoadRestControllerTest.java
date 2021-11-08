package com.henh.testman.load_result;

import com.henh.testman.results.load_results.LoadResultRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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
//
//        List<LoadResult> list = loadResultRepository.findAllByUserIdAndHistorySeq("heung", 1L);
//        loadResultRepository.deleteAll(list);

        String[] part = "http://localhost:8080".replaceAll("//", "").split(":");
        String protocol = part[0];
        String domain = part[1];
        int port = Integer.parseInt(part[2]);

        System.out.println(protocol);
        System.out.println(domain);
        System.out.println(port);
    }
}
