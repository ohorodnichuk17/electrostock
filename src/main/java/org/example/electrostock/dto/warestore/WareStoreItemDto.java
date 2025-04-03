package org.example.electrostock.dto.warestore;

import lombok.Data;
import org.example.electrostock.entities.ComponentEntity;

import java.util.List;

@Data
public class WareStoreItemDto {
    private int id;
    private String name;
    private List<ComponentEntity> components;
}
