package com.chris.oreillyclone.service;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.model.Product;
import com.chris.oreillyclone.model.Rating;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.repository.RatingRepository;
import com.chris.oreillyclone.request.RatingRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class RatingServiceImplementation implements RatingService{

    private final RatingRepository ratingRepository;
    private final ProductService productService;

    @Override
    public Rating createRating(RatingRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getPid());

        Rating rating = new Rating();
        rating.setRating(req.getRating());
        rating.setUser(user);
        rating.setProduct(product);
        rating.setCreatedAt();

        return ratingRepository.save(rating);
    }

    @Override
    public List<Rating> getProductsRating(Long pid) {
         return ratingRepository.getAllProductRatings(pid);
    }

}
