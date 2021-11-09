package com.henh.testman.common.errors;

public class FailLoadTestException extends RuntimeException {

    public FailLoadTestException(String message) {
        super(message);
    }

    public FailLoadTestException(String message, Throwable cause) {
        super(message, cause);
    }

}
