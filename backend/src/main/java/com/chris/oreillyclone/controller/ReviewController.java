package com.chris.oreillyclone.controller;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.exception.UserException;
import com.chris.oreillyclone.model.Review;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.request.ReviewRequest;
import com.chris.oreillyclone.service.ReviewService;
import com.chris.oreillyclone.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private final ReviewService reviewService;

    @Autowired
    private  final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest req, @RequestHeader("Authorization")String jwt) throws UserException, ProductException {
        User user = userService.findUserByJWT(jwt);
        Review review = reviewService.createReview(req, user);
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    @GetMapping("/product/{pid}")
    public ResponseEntity<List<Review>> getProductReviews(@PathVariable Long pid) {
        List<Review> reviews = reviewService.getAllReviews(pid);
        return new ResponseEntity<>(reviews,HttpStatus.CREATED);
    }
}
