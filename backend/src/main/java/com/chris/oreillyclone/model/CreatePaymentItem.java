package com.chris.oreillyclone.model;

import com.google.gson.annotations.SerializedName;

public class CreatePaymentItem {
    @SerializedName("id")
    String id;

    public String getId() {
        return id;
    }
}
