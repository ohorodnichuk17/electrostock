package org.example.electrostock.dto.component;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ComponentCreateDto {
    private int quantity;
    private String name;
    private String description;
    private String category;
    private String manufacturer;
    private String stockStatus;
    private String imageUrl;
    private int wareStoreId;
    private int userId;
}
