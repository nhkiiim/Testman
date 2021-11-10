package com.henh.testman.common.utils;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * @Title      : AsyncTaskEtc 관리
 * @Filename   : AsyncTaskEtc.java
 */
@Service("asyncTaskEtc")
public class AsyncTaskEtc {

    /**
     * 기타 스레드 테스트용 함수
     *
     * @param str
     */
    @Async("executorEtc")
    public void executorEtc(String str) {
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

    /**
     * 기타 스레드 테스트용 함수2
     *
     * @param str
     */
    @Async("executorEtc")
    public void executorEtc2(String str) {
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
