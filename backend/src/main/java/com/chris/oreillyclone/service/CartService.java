package com.chris.oreillyclone.service;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.model.Cart;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.request.AddItemRequest;

public interface CartService {

    Cart createCart(User user);

    void addCartItem(Long userId, AddItemRequest req) throws ProductException;

    Cart findUserCart(Long userId);
}
