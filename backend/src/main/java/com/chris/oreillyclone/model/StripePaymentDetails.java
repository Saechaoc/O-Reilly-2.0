package com.chris.oreillyclone.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StripePaymentDetails {
    private String stripeToken;
    private String chargeId;
    private String customerId;
    private String paymentIntentId;
    private String receiptUrl;
}