package com.chris.oreillyclone.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Product not found")
public class ProductException extends Exception {
    public ProductException(String message) {
        super(message);
    }
}
