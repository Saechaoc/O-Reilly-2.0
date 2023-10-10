package com.chris.oreillyclone.controller;

import com.chris.oreillyclone.exception.OrderException;
import com.chris.oreillyclone.model.CreatePayment;
import com.chris.oreillyclone.model.CreatePaymentResponse;
import com.chris.oreillyclone.model.Order;
import com.chris.oreillyclone.service.OrderService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {
    @Autowired
    private OrderService orderService;


    @PostMapping("/create-payment-intent/{orderId}")
    public CreatePaymentResponse createPaymentIntent(@PathVariable Long orderId, @RequestBody CreatePayment createPayment) throws StripeException, OrderException {
        Order order = orderService.findOrderById(orderId);
        PaymentIntentCreateParams params = new PaymentIntentCreateParams.Builder().setCurrency("usd")
            .setAmount((long) (order.getTotalPrice() * 100L))
                .putMetadata("orderId", String.valueOf(order.getId()))
                .build();
        // Create a PaymentIntent with the order amount and currency
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return new CreatePaymentResponse(paymentIntent.getClientSecret());
    }
}
