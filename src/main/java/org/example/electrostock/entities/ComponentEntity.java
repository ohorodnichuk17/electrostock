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
    private String category; // резистор, мікросхема, транзистор
    @Column(length = 100, nullable = false)
    private String manufacturer; // виробник
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;
    @Column(length = 100, nullable = true)
    private String unit; // одиниця виміру(шт, упаковка, метр і тд)

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;

    @ManyToMany
    @JoinTable(
            name = "ware_store_components",
            joinColumns = @JoinColumn(name = "component_id"),
            inverseJoinColumns = @JoinColumn(name = "ware_store_id")
    )
    private List<WareStoreEntity> wareStores;
}
