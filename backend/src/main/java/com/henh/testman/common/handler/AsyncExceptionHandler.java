package com.henh.testman.common.handler;

import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;

import java.lang.reflect.Method;

public class AsyncExceptionHandler implements AsyncUncaughtExceptionHandler {

    @Override
    public void handleUncaughtException(Throwable ex, Method method, Object... params) {
        System.out.println("==============>>>>>>>>>>>> THREAD ERROR");
        System.out.println("Exception Message :: " + ex.getMessage());
        System.out.println("Method Name :: " + method.getName());
        for (Object param : params) {
            System.out.println("Parameter Value :: " + param);
        }

        // JOB_LOG : 종료 입력
        // ...
        System.out.println("==============>>>>>>>>>>>> THREAD ERROR END");
    }

}
