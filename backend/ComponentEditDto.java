package org.example.electrostock.dto.component;

import lombok.Data;

@Data
public class ComponentEditDto {
    private int id;
    private int quantity;
    private String name;
    private String description;
    private String category;
    private String stockStatus;
    private String imageUrl;
    private int wareStoreId;
}
