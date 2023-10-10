package com.chris.oreillyclone.service;

import com.chris.oreillyclone.exception.CartItemException;
import com.chris.oreillyclone.exception.UserException;
import com.chris.oreillyclone.model.Cart;
import com.chris.oreillyclone.model.CartItem;
import com.chris.oreillyclone.model.Product;

public interface CartItemService {

    public CartItem createCartItem(CartItem cartItem);
    public CartItem updateCartItem(Long userId, Long pid, CartItem cartItem) throws CartItemException, UserException;

    public CartItem isCartItemSet(Cart cart, Product product, Long userId);

    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException;

    public CartItem findCartItemById(Long cartItemId) throws CartItemException;

}
