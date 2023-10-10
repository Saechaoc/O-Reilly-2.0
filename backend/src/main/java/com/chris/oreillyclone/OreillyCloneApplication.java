package com.chris.oreillyclone;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class OreillyCloneApplication {
    @PostConstruct
    public void setup() {
        Stripe.apiKey = "sk_test_51NwrFoBTp6tbw9GUkrClDBFsbYObF1MLUzZWXzMpOKAZLtHsFgxoRclh1nLzL6X6cgSTvRuq4Bxhd2yy1YcTqLy000NtPyb0b1";
    }
    public static void main(String[] args) {
        SpringApplication.run(OreillyCloneApplication.class, args);
    }

}
