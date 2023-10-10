package com.chris.oreillyclone.response;

import lombok.Getter;

@Getter
public class AuthResponse {
    private final String jwt;
    private final String message;

    public AuthResponse(String jwt, String message) {
        this.jwt = jwt;
        this.message = message;
    }
}
