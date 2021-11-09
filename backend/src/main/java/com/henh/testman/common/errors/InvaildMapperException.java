package com.henh.testman.common.errors;

public class InvaildMapperException extends RuntimeException {

    public InvaildMapperException(String message) {
        super(message);
    }

    public InvaildMapperException(String message, Throwable cause) {
        super(message, cause);
    }

}
