package com.henh.testman.common.errors;

public class InvalidMapperException extends RuntimeException {

    public InvalidMapperException(String message) {
        super(message);
    }

    public InvalidMapperException(String message, Throwable cause) {
        super(message, cause);
    }

}
