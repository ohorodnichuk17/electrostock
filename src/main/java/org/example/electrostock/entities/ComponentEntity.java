package org.example.electrostock.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name="tbl_components")
public class ComponentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 200, nullable = false)
    private String name;
    @Column(length = 500, nullable = true)
    private String description;
    @Column(length = 100, nullable = false)
    private String stockStatus;
    @Column(length = 100, nullable = false)
    private String category;
    @Column(length = 100, nullable = false)
    private String manufacturer;
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;
    @Column(nullable = false)
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;
    @ManyToOne
    @JoinColumn(name = "ware_store_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private WareStoreEntity wareStore;
}
