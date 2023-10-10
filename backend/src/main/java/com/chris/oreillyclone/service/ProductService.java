package com.chris.oreillyclone.service;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.model.Product;
import com.chris.oreillyclone.request.CreateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    Product createProduct(CreateProductRequest createProductRequest);

    ResponseEntity<String> deleteProduct(Long pid) throws ProductException;

    Product updateProduct(Long pid, Product req) throws ProductException;

    Product findProductById(Long pid) throws ProductException;

    List<Product> findProductByCategory(String category);

    Page<Product> getAllProducts(String category, double minPrice, double maxPrice, String sort, String stock, Integer pageNumber, Integer pageSize);

    List<Product> findProductsByPriceRange(double minPrice, double maxPrice);
    List<Product> searchProducts(String query);

    List<Product> findAllProducts() throws ProductException;
}
