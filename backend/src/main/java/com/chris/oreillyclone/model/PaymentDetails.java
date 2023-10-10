package com.chris.oreillyclone.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDetails {
    private String paymentMethod;
    private String status;

    private String transactionId;
    private String paymentId;
    private LocalDateTime paymentDate;
    private double amountPaid;
    private PaymentInformation paymentInformation;
}
