package com.chris.oreillyclone.repository;

import com.chris.oreillyclone.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartRepository extends JpaRepository<Cart,Long> {

    @Query("SELECT c from Cart c where c.user.id = ?1")
    public Cart findByUserId(Long userId);

}
