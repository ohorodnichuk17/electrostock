package org.example.electrostock.dto.order;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderItemDto {
    private int id;
    private LocalDateTime orderDate;
    private LocalDateTime returnDate;
    private String status;
    private int componentId;
    private int userId;
}
