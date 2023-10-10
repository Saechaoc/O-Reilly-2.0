package com.chris.oreillyclone.repository;

import com.chris.oreillyclone.model.Cart;
import com.chris.oreillyclone.model.CartItem;
import com.chris.oreillyclone.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query("SELECT c FROM CartItem c where c.cart = ?1 and c.product = ?2 and c.userId = ?3")
    public CartItem isCartItemSet(Cart cart, Product product, Long userId);

}
