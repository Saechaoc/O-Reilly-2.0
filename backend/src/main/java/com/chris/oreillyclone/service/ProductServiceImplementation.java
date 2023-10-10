package com.chris.oreillyclone.service;

import com.chris.oreillyclone.exception.ProductException;
import com.chris.oreillyclone.model.Category;
import com.chris.oreillyclone.model.Product;
import com.chris.oreillyclone.repository.CategoryRepository;
import com.chris.oreillyclone.repository.ProductRepository;
import com.chris.oreillyclone.request.CreateProductRequest;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductServiceImplementation implements ProductService {
    private final ProductRepository productRepository;
    private final UserService userService;
    private final CategoryRepository categoryRepository;


    /**
     * Possible candidate for Builder pattern
     */
    @Transactional
    @Override
    public Product createProduct(CreateProductRequest req) {

        Category topLevel = findOrCreateCategory(req.getTopLevelCategory(), null, 1);
        Category secondLevel = findOrCreateCategory(req.getSecondLevelCategory(), topLevel, 2);
        Category thirdLevel = findOrCreateCategory(req.getThirdLevelCategory(), secondLevel, 3);

        //Create Product & set values
        Product product = new Product();
        product.setTitle(req.getTitle());
        product.setDescription(req.getDescription());
        product.setPrice(req.getPrice());
        product.setImageUrl(req.getImageUrl());
        product.setProductLine(req.getProductLine());
        product.setProductFamily(req.getProductFamily());
        product.setCategory(thirdLevel);
        product.setQuantity(req.getQuantity());
        product.setStock();
        product.setPartNumber();
        product.setBrand(req.getBrand());

        product.setCreatedAt(LocalDateTime.now());

        return productRepository.save(product);
    }

    /**
     * Helper Method for createProduct\
     * @see #createProduct(CreateProductRequest)
     */
    private Category findOrCreateCategory(String categoryName, Category parent, int level) {
        Category category;

        if (parent == null) {
            category = categoryRepository.findCategoryByName(categoryName);
        } else {
            category = categoryRepository.findByNameAndParent(categoryName, parent.getName());
        }

        if (category == null) {
            category = new Category();
            category.setName(categoryName);
            category.setLevel(level);
            category.setParentCategory(parent);

            category = categoryRepository.save(category);
        }

        return category;
    }


    @Transactional
    @Override
    public ResponseEntity<String> deleteProduct(Long pid) throws ProductException {
        Product product = verifyProductExists(pid);
        /**
         * TODO:
         *   Authorization Check: Ensure the requester has permission to delete the product.
         *   Cascading deletes or handling dependent entities if needed.
         */

        productRepository.delete(product);
        return new ResponseEntity<>("Product with ID: " + pid + " deleted successfully", HttpStatus.OK);
    }


    @Override
    public Product updateProduct(Long pid, Product req) throws ProductException {
        Product product = verifyProductExists(pid);
        if (req.getQuantity() != 0) {
            product.setQuantity(req.getQuantity());
        }

        return productRepository.save(product);
    }

    //Can probably delete - implementation is in verifyProductExists
    @Override
    public Product findProductById(Long pid) throws ProductException {
        return verifyProductExists(pid);
    }

    @Override
    public List<Product> findProductByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    @Override
    public Page<Product> getAllProducts(String category, double minPrice, double maxPrice, String sort, String stock, Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        List<Product> products = productRepository.filterProduct(category, minPrice,maxPrice,sort);

        if("in_stock".equals(stock)) {
            products = products.stream()
                    .filter(p -> p.getQuantity() > 0)
                    .toList();
        }else if("out_of_stock".equals(stock)) {
            products = products.stream()
                    .filter(p -> p.getQuantity() == 0)
                    .toList();
        }

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex+pageable.getPageSize(), products.size());

        List<Product> pageContent = products.subList(startIndex, endIndex);

        return new PageImpl<>(pageContent,pageable,products.size());
    }

    private Product verifyProductExists(Long pid) throws ProductException {
        return productRepository.findProductById(pid).orElseThrow(() -> new ProductException("Product with id: " + pid + " does not exist."));
    }

    @Override
    public List<Product> findProductsByPriceRange(double minPrice, double maxPrice) {
        return productRepository.findProductsByPriceRange(minPrice,maxPrice);
    }

    @Override
    public List<Product> searchProducts(String query) {
        String wrappedQuery = "%" + query + "%";
        return productRepository.searchProducts(wrappedQuery);
    }

    @Override
    public List<Product> findAllProducts() throws ProductException {
        return productRepository.findAllProducts();
    }
}
