package com.henh.testman.common.errors;

public class FailApiTestException extends RuntimeException {

    public FailApiTestException(String message) {
        super(message);
    }

    public FailApiTestException(String message, Throwable cause) {
        super(message, cause);
    }

}
