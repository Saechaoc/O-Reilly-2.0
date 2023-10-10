package com.chris.oreillyclone.config;

public class JwtConstant {
    public static final String SECRET_KEY = "alskdjfalskjdbnnpoaiwneouhzlkjpoiujowhoe";
    public static final String JWT_HEADER = "Authorization";

    private JwtConstant() {
        throw new IllegalStateException("Utility Class");
    }
}
