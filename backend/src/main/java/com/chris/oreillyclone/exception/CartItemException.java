package com.chris.oreillyclone.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class CartItemException extends Exception {

    // Constructor with message only
    public CartItemException(String message) {
        super(message);
    }

    // Constructor with message and cause
    public CartItemException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor with cause only
    public CartItemException(Throwable cause) {
        super(cause);
    }

    // Constructor with message, cause, suppression enabled or disabled, and writable stack trace enabled or disabled
    public CartItemException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
