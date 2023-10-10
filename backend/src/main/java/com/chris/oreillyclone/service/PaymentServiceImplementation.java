//package com.chris.oreillyclone.service;
//
//import com.chris.oreillyclone.model.PaymentDetails;
//import com.chris.oreillyclone.model.PaymentInformation;
//import com.chris.oreillyclone.model.StripePaymentDetails;
//import com.chris.oreillyclone.model.User;
//import com.chris.oreillyclone.repository.PaymentInfoRepository;
//import com.stripe.Stripe;
//import jakarta.annotation.PostConstruct;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Service;
//
//@Service
//@AllArgsConstructor
//public class PaymentServiceImplementation implements PaymentService {
//
//    private final PaymentInfoRepository PaymentInfoRepository;
//
//    @PostConstruct
//    public void init() {
//        Stripe.apiKey = "sk_test_51NwrFoBTp6tbw9GUkrClDBFsbYObF1MLUzZWXzMpOKAZLtHsFgxoRclh1nLzL6X6cgSTvRuq4Bxhd2yy1YcTqLy000NtPyb0b1";
//    }
//
//    @Override
//    public PaymentDetails processpayment(PaymentInformation paymentInformation, double amount) {
//        return null;
//    }
//
//    @Override
//    public PaymentDetails savePaymentDetails(PaymentDetails paymentDetails) {
//        return null;
//    }
//
//    @Override
//    public StripePaymentDetails saveStripePaymentDetails(StripePaymentDetails stripePaymentDetails) {
//        return null;
//    }
//
//    @Override
//    public PaymentInformation mapCustomerToPaymentMethod(User user, PaymentInformation paymentInformation) {
//        return null;
//    }
//}
