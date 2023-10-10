package com.chris.oreillyclone.repository;

import com.chris.oreillyclone.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating,Long> {

    @Query("SELECT r from Rating r where r.product.pid = ?1")
    List<Rating> getAllProductRatings(Long pid);
}
