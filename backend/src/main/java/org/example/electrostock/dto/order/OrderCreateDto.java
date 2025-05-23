package org.example.electrostock.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderCreateDto {
    private LocalDateTime orderDate;
    private LocalDateTime returnDate;
    private int componentId;
    private int userId;
}
