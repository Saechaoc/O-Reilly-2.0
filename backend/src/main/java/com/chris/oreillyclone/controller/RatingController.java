package com.chris.oreillyclone.controller;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.exception.UserException;
import com.chris.oreillyclone.model.Rating;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.request.RatingRequest;
import com.chris.oreillyclone.service.RatingService;
import com.chris.oreillyclone.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/ratings")
public class RatingController {
    @Autowired
    private final UserService userService;

    @Autowired
    private RatingService ratingService;

    @PostMapping("/create")
    public ResponseEntity<Rating> createRating(@RequestBody RatingRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        User user = userService.findUserByJWT(jwt);
        Rating rating = ratingService.createRating(req, user);

        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }
    // TODO
//    @PostMapping("/update")
//    public ResponseEntity<Rating> updateRating(@RequestBody RatingRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
//        User user = userService.findUserByJWT(jwt);
//        Rating rating = ratingService.updateRating(req, user);
//
//        return new ResponseEntity<>(rating, HttpStatus.CREATED);
//    }

    @GetMapping("/product/{pid}")
    public ResponseEntity<List<Rating>> getProductsRating(@PathVariable Long pid, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        User user = userService.findUserByJWT(jwt);
        List<Rating> ratings = ratingService.getProductsRating(pid);

        return new ResponseEntity<>(ratings,HttpStatus.CREATED);
    }
}
