package com.henh.testman.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * @Title      : AsyncTaskSample 관리
 * @Filename   : AsyncTaskSample.java
 */
@Service("asyncTaskSample")
public class AsyncTaskSample {

    private static final Logger logger = LoggerFactory.getLogger(AsyncTaskSample.class);

    /**
     * 시뮬레이션 테스트용 함수
     *
     * @param str
     */
    @Async("executorSample")
    public void executorSample(String str) {
        // LOG : 시작 입력
        // ...
        logger.info("==============>>>>>>>>>>>> THREAD START");

        // 내용
        // 내용
        // 내용

        // LOG : 종료 입력
        // ...
        logger.info("==============>>>>>>>>>>>> THREAD END");
    }

    /**
     * 시뮬레이션 테스트용 함수2
     *
     * @param str
     */
    @Async("executorSample")
    public void executorSample2(String str) {
        // LOG : 시작 입력
        // ...
        System.out.println("==============>>>>>>>>>>>> THREAD START");

        // 내용
        // 내용
        // 내용

        // LOG : 종료 입력
        // ...
        System.out.println("==============>>>>>>>>>>>> THREAD END");
    }
}
