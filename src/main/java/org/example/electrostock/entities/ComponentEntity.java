package org.example.electrostock.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.electrostock.serializer.ComponentSerializer;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tbl_components")
@JsonSerialize(using = ComponentSerializer.class)
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
    @Column(nullable = false)
    private int quantity;
    @Column(length = 500)
    private String imageUrl;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;
    @ManyToOne
    @JoinColumn(name = "ware_store_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private WareStoreEntity wareStore;
}
