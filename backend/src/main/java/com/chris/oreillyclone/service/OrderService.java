package com.chris.oreillyclone.service;

import com.chris.oreillyclone.exception.OrderException;
import com.chris.oreillyclone.model.Address;
import com.chris.oreillyclone.model.Order;
import com.chris.oreillyclone.model.User;

import java.util.List;

public interface OrderService {
    Order createOrder(User user, Address shippingAddress);
    List<Order> userOrderHistory(Long userid);
    Order placedOrder(Long orderId) throws OrderException;
    Order confirmedOrder(Long orderId) throws OrderException;
    Order shippedOrder(Long orderId) throws OrderException;
    Order deliveredOrder(Long orderId) throws OrderException;
    Order canceledOrder(Long orderId) throws OrderException;
    Order findOrderById(Long orderId) throws OrderException;

    List<Order>getAllOrders();
    void deleteOrder(Long orderId) throws OrderException;
}
