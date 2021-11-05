package com.henh.testman.history;

import com.henh.testman.histories.History;
import com.henh.testman.histories.HistoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class HistoryControllerTest {

    @Autowired
    HistoryRepository historyRepository;

    @Test
    public void basicCrudOperations() {
        List<History> list = historyRepository.findByWorkspaceSeq(1L);
        for (History history : list) {
            System.out.println(history.toString());
        }
    }
}
