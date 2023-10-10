package com.chris.oreillyclone.service;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.model.Product;
import com.chris.oreillyclone.model.Rating;
import com.chris.oreillyclone.model.Review;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.repository.ProductRepository;
import com.chris.oreillyclone.repository.ReviewRepository;
import com.chris.oreillyclone.request.ReviewRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReviewServiceImplementation implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductService productService;
    private final ProductRepository productRepository;

    @Override
    public Review createReview(ReviewRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getPid());

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReview(req.getReview());
        review.setCreatedAt();

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReviews(Long pid) {
        return reviewRepository.getAllProductReviews(pid);
    }
}
