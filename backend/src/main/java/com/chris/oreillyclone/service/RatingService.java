package com.chris.oreillyclone.service;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.model.Rating;
import com.chris.oreillyclone.model.User;
import com.chris.oreillyclone.request.RatingRequest;

import java.util.List;

public interface RatingService {
    Rating createRating(RatingRequest req, User user) throws ProductException;
    List<Rating> getProductsRating(Long pid);
}
