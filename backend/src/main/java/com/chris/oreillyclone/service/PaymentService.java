package com.chris.oreillyclone.service;

import com.chris.oreillyclone.model.PaymentDetails;
import com.chris.oreillyclone.model.PaymentInformation;
import com.chris.oreillyclone.model.StripePaymentDetails;
import com.chris.oreillyclone.model.User;

public interface PaymentService {
    PaymentDetails processpayment(PaymentInformation paymentInformation, double amount);
    PaymentDetails savePaymentDetails(PaymentDetails paymentDetails);

    StripePaymentDetails saveStripePaymentDetails(StripePaymentDetails stripePaymentDetails);

    PaymentInformation mapCustomerToPaymentMethod(User user, PaymentInformation paymentInformation);
}
