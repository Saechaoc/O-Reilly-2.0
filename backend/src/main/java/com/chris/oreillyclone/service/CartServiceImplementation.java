package com.chris.oreillyclone.service;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.model.Cart;
import com.chris.oreillyclone.model.CartItem;
import com.chris.oreillyclone.model.Product;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.repository.CartItemRepository;
import com.chris.oreillyclone.repository.CartRepository;
import com.chris.oreillyclone.request.AddItemRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImplementation implements CartService{
    private final CartRepository cartRepository;
    private final CartItemService cartItemService;
    private final ProductService productService;

    private static final Logger logger = LoggerFactory.getLogger(CartServiceImplementation.class);
    private final CartItemRepository cartItemRepository;

    public CartServiceImplementation(CartRepository cartRepository, CartItemService cartItemService, ProductService productService,
                                     CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public void addCartItem(Long userId, AddItemRequest req) throws ProductException {
        Cart cart = cartRepository.findByUserId(userId);
        Product product = productService.findProductById(req.getPid());

        CartItem isPresent = cartItemService.isCartItemSet(cart, product, userId);

        if (isPresent == null) {
            CartItem newCartItem = new CartItem();
            newCartItem.setProduct(product);
            newCartItem.setCart(cart);
            newCartItem.setQuantity(req.getQuantity());
            newCartItem.setUserId(userId);

            double price = req.getPrice() * req.getQuantity();
            newCartItem.setPrice(price);

            CartItem createdCartItem = cartItemService.createCartItem(newCartItem);
            cart.getCartItems().add(createdCartItem);
        }else {
            CartItem item = isPresent;

            item.setQuantity(item.getQuantity()+ req.getQuantity());
            item.setPrice(item.getQuantity() * item.getProduct().getPrice());
//            logger.info("Cart Item : " + String.valueOf(item.getQuantity()));
            cartItemRepository.save(item);
        }
    }

    @Override
    public Cart findUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        cart.calculateTotalPrice();
        cart.calculateTotalItems();
        return cartRepository.save(cart);
    }
}
