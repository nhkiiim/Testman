package com.henh.testman.common.config;

import com.henh.testman.common.handler.AsyncExceptionHandler;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.beans.factory.annotation.Qualifier;
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

    private static final int TASK_SAMPLE_CORE_POOL_SIZE = 2;

    private static final int TASK_SAMPLE_MAX_POOL_SIZE = 5;

    private static final int TASK_SAMPLE_QUEUE_CAPACITY = 0;

    private static final String EXECUTOR_SAMPLE_BEAN_NAME = "executorSample";

    @Resource(name = "executorSample")
    private ThreadPoolTaskExecutor executorSample;

    private static final int TASK_ETC_CORE_POOL_SIZE = 5;

    private static final int TASK_ETC_MAX_POOL_SIZE = 10;

    private static final int TASK_ETC_QUEUE_CAPACITY = 0;

    private static final String EXECUTOR_ETC_BEAN_NAME = "executorEtc";

    @Resource(name = "executorEtc")
    private ThreadPoolTaskExecutor executorEtc;

    /**
     * 샘플 Thread 생성
     *
     * @return
     */
    @Bean(name = "executorSample")
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(TASK_SAMPLE_CORE_POOL_SIZE);
        executor.setMaxPoolSize(TASK_SAMPLE_MAX_POOL_SIZE);
        executor.setQueueCapacity(TASK_SAMPLE_QUEUE_CAPACITY);
        executor.setBeanName(EXECUTOR_SAMPLE_BEAN_NAME);
        executor.initialize();
        return executor;
    }

    /**
     * 샘플 Thread 등록 가능 여부
     *
     * @return 실행중인 task 개수가 최대 개수(max + queue)보다 크거나 같으면 false
     */
    public boolean isSampleTaskExecute() {
        boolean rtn = true;

        System.out.println("EXECUTOR_SAMPLE.getActiveCount() : " + executorSample.getActiveCount());

        // 실행중인 task 개수가 최대 개수(max + queue)보다 크거나 같으면 false
        if (executorSample.getActiveCount() >= (TASK_SAMPLE_MAX_POOL_SIZE + TASK_SAMPLE_QUEUE_CAPACITY)) {
            rtn = false;
        }

        return rtn;
    }

    /**
     * 샘플 Thread 등록 가능 여부
     *
     * @param createCnt : 생성 개수
     * @return 실행중인 task 개수 + 실행할 개수가 최대 개수(max + queue)보다 크면 false
     */
    public boolean isSampleTaskExecute(int createCnt) {
        boolean rtn = true;

        // 실행중인 task 개수 + 실행할 개수가 최대 개수(max + queue)보다 크거나 같으면 false
        if ((executorSample.getActiveCount() + createCnt) > (TASK_SAMPLE_MAX_POOL_SIZE + TASK_SAMPLE_QUEUE_CAPACITY)) {
            rtn = false;
        }

        return rtn;
    }

    /**
     * 기타 Thread 생성
     *
     * @return
     */
    @Bean(name = "executorEtc")
    @Qualifier
    public Executor taskExecutorEtc() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(TASK_ETC_CORE_POOL_SIZE);
        executor.setMaxPoolSize(TASK_ETC_MAX_POOL_SIZE);
        executor.setQueueCapacity(TASK_ETC_QUEUE_CAPACITY);
        executor.setBeanName(EXECUTOR_ETC_BEAN_NAME);
        executor.initialize();
        return executor;
    }

    /**
     * 기타 Thread 등록 가능 여부
     *
     * @return 실행중인 task 개수가 최대 개수(max + queue)보다 크거나 같으면 false
     */
    public boolean isEtcTaskExecute() {
        boolean rtn = true;

        // 실행중인 task 개수가 최대 개수(max + queue)보다 크거나 같으면 false
        if (executorEtc.getActiveCount() >= (TASK_ETC_MAX_POOL_SIZE + TASK_ETC_QUEUE_CAPACITY)) {
            rtn = false;
        }

        return rtn;
    }

    /**
     * 기타 Thread 등록 가능 여부
     *
     * @param createCnt : 생성 개수
     * @return 실행중인 task 개수 + 실행할 개수가 최대 개수(max + queue)보다 크면 false
     */
    public boolean isEtcTaskExecute(int createCnt) {
        boolean rtn = true;

        // 실행중인 task 개수 + 실행할 개수가 최대 개수(max + queue)보다 크거나 같으면 false
        if ((executorEtc.getActiveCount() + createCnt) > (TASK_ETC_MAX_POOL_SIZE + TASK_ETC_QUEUE_CAPACITY)) {
            rtn = false;
        }

        return rtn;
    }

    /* (non-Javadoc)
     * @see org.springframework.scheduling.annotation.AsyncConfigurer#getAsyncUncaughtExceptionHandler()
     */
    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new AsyncExceptionHandler();
    }

}
