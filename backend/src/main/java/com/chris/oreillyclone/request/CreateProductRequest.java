package com.chris.oreillyclone.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class CreateProductRequest {
    private String title;
    private String description;
    private int price;

    private int quantity;
    private String brand;
    private String imageUrl;

    private String topLevelCategory;
    private String secondLevelCategory;
    private String thirdLevelCategory;

    private String productLine;
    private String productFamily;
    private String partNumber;
}
