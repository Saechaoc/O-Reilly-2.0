package com.chris.oreillyclone.controller;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.model.Product;
import com.chris.oreillyclone.service.ProductService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@NoArgsConstructor
public class ProductController {
    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping()
    public ResponseEntity<Page<Product>> findProductsByCategoryHandler(@RequestParam String category,
            @RequestParam double minPrice, @RequestParam double maxPrice, @RequestParam String sort,
            @RequestParam String stock, @RequestParam Integer pageNumber, @RequestParam Integer pageSize) {

        Page<Product> res = productService.getAllProducts(category,minPrice,maxPrice,sort,stock,pageNumber,pageSize);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{pid}")
    public ResponseEntity<Product> findProductsByIdHandler(@PathVariable Long pid) throws ProductException {

        Product product = productService.findProductById(pid);
        return new ResponseEntity<>(product, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProductHandler(@RequestParam String query) {
        List<Product> products = productService.searchProducts(query);

        return new ResponseEntity<>(products,HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<Product>> findAllProducts() throws ProductException {
        List<Product> products = productService.findAllProducts();
        return new ResponseEntity<>(products, HttpStatus.ACCEPTED);
    }
}
