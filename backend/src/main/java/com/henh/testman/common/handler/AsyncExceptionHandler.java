package com.henh.testman.common.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;

import java.lang.reflect.Method;

public class AsyncExceptionHandler implements AsyncUncaughtExceptionHandler {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void handleUncaughtException(Throwable ex, Method method, Object... params) {
        logger.error("Unexpected asynchronous exception at : "
                + method.getDeclaringClass().getName() + "." + method.getName(), ex.getMessage());
    }

}
