package org.example.electrostock.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.example.electrostock.dto.order.OrderCreateDto;
import org.example.electrostock.dto.order.OrderItemDto;
import org.example.electrostock.entities.ComponentEntity;
import org.example.electrostock.entities.OrderEntity;
import org.example.electrostock.entities.UserEntity;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-01T17:53:17+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public OrderItemDto orderItemDto(OrderEntity entity) {
        if ( entity == null ) {
            return null;
        }

        OrderItemDto orderItemDto = new OrderItemDto();

        orderItemDto.setComponentId( entityComponentId( entity ) );
        orderItemDto.setUserId( entityUserId( entity ) );
        orderItemDto.setId( entity.getId() );
        orderItemDto.setOrderDate( entity.getOrderDate() );
        orderItemDto.setReturnDate( entity.getReturnDate() );

        return orderItemDto;
    }

    @Override
    public List<OrderItemDto> orderEntitiesToDtos(List<OrderEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<OrderItemDto> list = new ArrayList<OrderItemDto>( entities.size() );
        for ( OrderEntity orderEntity : entities ) {
            list.add( orderItemDto( orderEntity ) );
        }

        return list;
    }

    @Override
    public OrderEntity orderCreateDto(OrderCreateDto dto) {
        if ( dto == null ) {
            return null;
        }

        OrderEntity orderEntity = new OrderEntity();

        orderEntity.setComponent( orderCreateDtoToComponentEntity( dto ) );
        orderEntity.setUser( orderCreateDtoToUserEntity( dto ) );
        orderEntity.setOrderDate( dto.getOrderDate() );
        orderEntity.setReturnDate( dto.getReturnDate() );

        return orderEntity;
    }

    private int entityComponentId(OrderEntity orderEntity) {
        if ( orderEntity == null ) {
            return 0;
        }
        ComponentEntity component = orderEntity.getComponent();
        if ( component == null ) {
            return 0;
        }
        int id = component.getId();
        return id;
    }

    private int entityUserId(OrderEntity orderEntity) {
        if ( orderEntity == null ) {
            return 0;
        }
        UserEntity user = orderEntity.getUser();
        if ( user == null ) {
            return 0;
        }
        int id = user.getId();
        return id;
    }

    protected ComponentEntity orderCreateDtoToComponentEntity(OrderCreateDto orderCreateDto) {
        if ( orderCreateDto == null ) {
            return null;
        }

        ComponentEntity.ComponentEntityBuilder componentEntity = ComponentEntity.builder();

        componentEntity.id( orderCreateDto.getComponentId() );

        return componentEntity.build();
    }

    protected UserEntity orderCreateDtoToUserEntity(OrderCreateDto orderCreateDto) {
        if ( orderCreateDto == null ) {
            return null;
        }

        UserEntity.UserEntityBuilder userEntity = UserEntity.builder();

        userEntity.id( orderCreateDto.getUserId() );

        return userEntity.build();
    }
}
