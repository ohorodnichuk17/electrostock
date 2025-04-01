package org.example.electrostock.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name="tbl_wareStore")
public class WareStoreEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private int quantity; // к-сть одиниць на складі
    @Column(length = 100, nullable = false)
    private String stockStatus; // в наявності, на замовлення, в резерві

    @ManyToMany(mappedBy = "wareStores")
    private List<ComponentEntity> components;
}
