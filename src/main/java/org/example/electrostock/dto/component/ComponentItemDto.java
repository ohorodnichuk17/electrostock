package org.example.electrostock.dto.component;

import lombok.Data;
import org.example.electrostock.entities.UserEntity;
import org.example.electrostock.entities.WareStoreEntity;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ComponentItemDto {
    private int id;
    private int quantity;
    private String name;
    private String description;
    private String category;
    private String manufacturer;
    private String stockStatus;
    private BigDecimal price;
    private UserEntity user;
    private WareStoreEntity wareStore;
}
