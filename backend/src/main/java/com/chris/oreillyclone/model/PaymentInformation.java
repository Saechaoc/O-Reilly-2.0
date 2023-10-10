package com.chris.oreillyclone.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@Embeddable
public class PaymentInformation {

    @Column(name="cardholder_name")
    private String cardholderName;

    @Column(name="card_number")
    private String cardNumber;

    @Column(name="expiration_date")
    private LocalDate expirationDate;
    @Column(name="cvv")
    private String cvv;


}
