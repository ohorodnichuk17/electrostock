package org.example.electrostock.mapper;

import org.example.electrostock.dto.order.OrderCreateDto;
import org.example.electrostock.dto.order.OrderItemDto;
import org.example.electrostock.entities.OrderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    @Mapping(source = "component.id", target = "componentId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "id", target = "id")
    OrderItemDto orderItemDto(OrderEntity entity);
    List<OrderItemDto> orderEntitiesToDtos(List<OrderEntity> entities);

    @Mapping(source = "componentId", target = "component.id")
    @Mapping(source = "userId", target = "user.id")
    OrderEntity orderCreateDto(OrderCreateDto dto);
}
