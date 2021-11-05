package com.henh.testman.history;

import com.henh.testman.histories.History;
import com.henh.testman.histories.HistoryRepository;
import com.henh.testman.histories.HistoryRepositorySupport;
import com.henh.testman.uri_info.UriInfo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class HistoryControllerTest {

    @Autowired
    HistoryRepository historyRepository;

    @Autowired
    HistoryRepositorySupport historyRepositorySupport;

    @Test
    public void basicCrudOperations() {
        List<History> list = historyRepository.findByWorkspaceSeq(3L);
        System.out.println(list.size());
        for (History history : list) {
            UriInfo uriInfo = history.getUriInfo();
            System.out.println(uriInfo.getSeq());
        }

//        List<HistoryDto> listDto = historyRepositorySupport.findByWorkspaceSeq(3L);
//        System.out.println(listDto.size());
//        for (HistoryDto history : listDto) {
//            UriInfo uriInfo = history.getUriInfo();
//            System.out.println(uriInfo.getPath());
//        }
    }
}
