package com.chris.oreillyclone.service;

import com.chris.oreillyclone.exception.CartItemException;
import com.chris.oreillyclone.exception.UserException;
import com.chris.oreillyclone.model.Cart;
import com.chris.oreillyclone.model.CartItem;
import com.chris.oreillyclone.model.Product;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.repository.CartItemRepository;
import com.chris.oreillyclone.repository.CartRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class CartItemServiceImplementation implements CartItemService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(CartItemServiceImplementation.class);

    public CartItemServiceImplementation(CartRepository cartRepository, CartItemRepository cartItemRepository, UserService userService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateCartItem(Long userId, Long pid, CartItem cartItem) throws CartItemException, UserException {
        CartItem item = findCartItemById(pid);
        User user = userService.findUserById(item.getUserId());

        if(user.getId().equals(userId)) {
//            logger.info("Cart Item : " + String.valueOf(item));
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(cartItem.getQuantity() * cartItem.getProduct().getPrice());
        }
        return cartItemRepository.save(item);
    }

//    @Override
//    public Cart updateCartItem(Long userId, Long pid, CartItem cartItem) throws CartItemException, UserException {
//        CartItem item = findCartItemById(pid);
//        User user = userService.findUserById(item.getUserId());
//
//        if(user.getId().equals(userId)) {
//            item.setQuantity(cartItem.getQuantity());
//            item.setPrice(cartItem.getQuantity() * cartItem.getProduct().getPrice());
//        }
//        cartItemRepository.save(item);
//
//        // Fetch the entire cart and return it
//        Cart cart = cartRepository.findByUserId(userId);
//        cart.calculateTotalPrice();
//        cart.calculateTotalItems();
//        return cartRepository.save(cart);
//    }


    @Override
    public CartItem isCartItemSet(Cart cart, Product product, Long userId) {
        return cartItemRepository.isCartItemSet(cart,product,userId);
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartItemById(cartItemId);

        User user = userService.findUserById(cartItem.getUserId());
        User reqUser = userService.findUserById(userId);

        if (user.getId().equals(reqUser.getId())) {
            cartItemRepository.deleteById(cartItemId);
        } else {
            throw new UserException("You can't remove another user's item");
        }

    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartItemException {
        return cartItemRepository.findById(cartItemId).orElseThrow(()-> new CartItemException("Item cannot be found with ID: " + cartItemId));
    }
}
