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
    private int quantity;
    @Column(length = 100, nullable = false)
    private String stockStatus;

    @ManyToMany(mappedBy = "wareStores")
    private List<ComponentEntity> components;
}
