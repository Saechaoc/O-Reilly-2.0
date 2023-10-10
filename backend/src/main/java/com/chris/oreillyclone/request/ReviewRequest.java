package com.chris.oreillyclone.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {
    private Long pid;
    private String review;
}
