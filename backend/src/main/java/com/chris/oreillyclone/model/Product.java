package com.chris.oreillyclone.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pid;

    @Column(name = "title")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "price")
    private double price;

    @Column(name = "product_line")
    private String productLine;
    @Column(name = "product_family")
    private String productFamily;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "Quantity")
    private int quantity;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rating> ratingList = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviewList = new ArrayList<>();

    @Column(name = "num_ratings")
    private int numRatings;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    @Column(name = "brand")
    private String brand;

    private String stock;
    private String partNumber;

    private LocalDateTime createdAt;

    public void setStock() {
        if (this.quantity > 0) {
            this.setStock("in_stock");
        } else {
            this.setStock(("out_of_stock"));
        }
    }

    public void setPartNumber() {
        String firstLetter = this.getProductFamily();
        String secondLetter = this.getProductLine();

        char firstLetterFamily = Character.toUpperCase(firstLetter.charAt(0));
        char firstLetterLine = Character.toUpperCase(secondLetter.charAt(0));

        String newPartNumber = String.valueOf(firstLetterFamily) + firstLetterLine;

        int timestamp = (int) Instant.now().toEpochMilli()/10000;

        newPartNumber += timestamp;

        this.setPartNumber(newPartNumber);
    }
}
