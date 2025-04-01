package org.example.electrostock.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "tbl_orders")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private LocalDateTime orderDate;
    @Column(nullable = false)
    private double totalAmount;
    @Column(length = 100, nullable = false)
    private String status; // підтверджено, в обробці, відправлено
    @Column(length = 100, nullable = false)
    private String paymentStatus; // оплачено, не оплачено

    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;

    @ManyToMany
    @JoinTable(
            name = "order_components",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "component_id")
    )
    private List<ComponentEntity> components;
}
