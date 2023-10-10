package com.chris.oreillyclone.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingRequest {
    private Long pid;
    private double rating;
}
