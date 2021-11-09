package com.henh.testman.api_result;

import com.henh.testman.results.api_results.ApiResultRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ApiRestControllerTest {

    @Autowired
    ApiResultRepository apiResultRepository;

    @Test
    public void basicCrudOperations() {


    }
}
