package com.henh.testman.common.config;

import com.henh.testman.common.handler.AsyncExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import javax.annotation.Resource;
import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    private static final int TASK_CORE_POOL_SIZE = 5;

    private static final int TASK_MAX_POOL_SIZE = 40;

    private static final int TASK_QUEUE_CAPACITY = 20;

    private static final String EXECUTOR_BEAN_NAME = "executor";

    @Resource
    private ThreadPoolTaskExecutor executor;

    /**
     * Thread 생성
     * @return executor
     */
    @Bean(name = "executor")
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(TASK_CORE_POOL_SIZE);
        executor.setMaxPoolSize(TASK_MAX_POOL_SIZE);
        executor.setQueueCapacity(TASK_QUEUE_CAPACITY);
        executor.setBeanName(EXECUTOR_BEAN_NAME);
        executor.initialize();
        return executor;
    }

    /**
     * Thread 등록 가능 여부
     * @return 실행중인 task 개수가 최대 개수(max + queue)보다 크거나 같으면 false
     */
    public boolean isTaskExecute() {
        boolean rtn = true;

        logger.debug("EXECUTOR.getActiveCount() : " + executor.getActiveCount());

        // 실행중인 task 개수가 최대 개수(max + queue)보다 크거나 같으면 false
        if (executor.getActiveCount() >= (TASK_MAX_POOL_SIZE + TASK_QUEUE_CAPACITY)) {
            rtn = false;
        }

        return rtn;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new AsyncExceptionHandler();
    }

}
