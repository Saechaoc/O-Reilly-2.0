package com.chris.oreillyclone.service;

import com.chris.oreillyclone.model.OrderItem;
import com.chris.oreillyclone.repository.OrderItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OrderItemServiceImplementation implements OrderItemService{
    private final OrderItemRepository orderItemRepository;

    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }
}
