package com.chris.oreillyclone.repository;

import com.chris.oreillyclone.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("Select o from customer_order o where o.user.id = ?1 and o.orderStatus in('PLACED','CONFIRMED','DELIVERED')")
    public List<Order> getUsersOrders(@Param("userId") Long userId);
}
