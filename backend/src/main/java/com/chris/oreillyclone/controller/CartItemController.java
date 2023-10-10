package com.chris.oreillyclone.controller;

import com.chris.oreillyclone.exception.CartItemException;
import com.chris.oreillyclone.exception.UserException;
import com.chris.oreillyclone.model.Cart;
import com.chris.oreillyclone.model.CartItem;
import com.chris.oreillyclone.model.Product;
import com.chris.oreillyclone.service.CartItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart_items")
@AllArgsConstructor
public class CartItemController {

    @Autowired
    private final CartItemService cartItemService;

    @PostMapping
    public ResponseEntity<CartItem> createCartItem(@RequestBody CartItem cartItem) {
        CartItem createdItem = cartItemService.createCartItem(cartItem);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    @PutMapping("/{userId}/{pid}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long userId, @PathVariable Long pid, @RequestBody CartItem cartItem) throws CartItemException, UserException {
        CartItem updatedItem = cartItemService.updateCartItem(userId, pid, cartItem);
        return new ResponseEntity<>(updatedItem, HttpStatus.OK);
    }

    @GetMapping("/isCartItemSet")
    public ResponseEntity<CartItem> isCartItemSet(@RequestParam Cart cart, @RequestParam Product product, @RequestParam Long userId) {
        CartItem cartItem = cartItemService.isCartItemSet(cart, product, userId);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long userId, @PathVariable Long cartItemId) throws CartItemException, UserException {
        cartItemService.removeCartItem(userId, cartItemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{cartItemId}")
    public ResponseEntity<CartItem> findCartItemById(@PathVariable Long cartItemId) throws CartItemException {
        CartItem cartItem = cartItemService.findCartItemById(cartItemId);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }
}