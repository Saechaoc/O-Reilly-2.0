package com.chris.oreillyclone.controller;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.model.Product;
import com.chris.oreillyclone.request.CreateProductRequest;
import com.chris.oreillyclone.response.ApiResponse;
import com.chris.oreillyclone.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
@AllArgsConstructor
public class AdminProductController {
    @Autowired
    private final ProductService productService;

    @PostMapping("/")
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest req) {
        Product product = productService.createProduct(req);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @DeleteMapping("/{pid}/delete")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long pid) throws ProductException {
        productService.deleteProduct(pid);
        ApiResponse res = new ApiResponse();
        res.setMessage("Product deleted successfully.");
        res.setStatus(true);

        return new ResponseEntity<>(res,HttpStatus.OK);
    }

}
