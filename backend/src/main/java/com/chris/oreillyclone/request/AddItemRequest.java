package com.chris.oreillyclone.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddItemRequest {
    private Long pid;
    private int quantity;
    private double price;
}
