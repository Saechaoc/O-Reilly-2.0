package com.chris.oreillyclone.controller;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.exception.UserException;
import com.chris.oreillyclone.model.Cart;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.request.AddItemRequest;
import com.chris.oreillyclone.response.ApiResponse;
import com.chris.oreillyclone.service.CartService;
import com.chris.oreillyclone.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {
    @Autowired
    private final CartService cartService;

    @Autowired
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(CartController.class);



    @GetMapping("/")
    @ManagedOperation(description = "find cart by user id")
    public ResponseEntity<Cart> findUserByCart(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserByJWT(jwt);
        Cart cart = cartService.findUserCart(user.getId());

        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    @ManagedOperation(description = "add item to cart")
    public ResponseEntity<ApiResponse>addItemToCart(@RequestBody AddItemRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        User user = userService.findUserByJWT(jwt);
        cartService.addCartItem(user.getId(),req);

        ApiResponse res = new ApiResponse();
        res.setMessage("Item added to cart");
        res.setStatus(true);
//        logger.info("Request Data");
//        logger.info(String.valueOf(req.getPid()));
//        logger.info(String.valueOf(req.getQuantity()));
//        logger.info(String.valueOf(req.getPrice()));
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

}
