package org.example.electrostock.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.example.electrostock.dto.component.ComponentCreateDto;
import org.example.electrostock.dto.component.ComponentEditDto;
import org.example.electrostock.dto.component.ComponentItemDto;
import org.example.electrostock.entities.ComponentEntity;
import org.example.electrostock.entities.WareStoreEntity;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-01T17:53:17+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class ComponentMapperImpl implements ComponentMapper {

    @Override
    public ComponentItemDto componentItemDto(ComponentEntity entity) {
        if ( entity == null ) {
            return null;
        }

        ComponentItemDto componentItemDto = new ComponentItemDto();

        componentItemDto.setWareStoreId( entityWareStoreId( entity ) );
        componentItemDto.setId( entity.getId() );
        componentItemDto.setQuantity( entity.getQuantity() );
        componentItemDto.setName( entity.getName() );
        componentItemDto.setDescription( entity.getDescription() );
        componentItemDto.setCategory( entity.getCategory() );
        componentItemDto.setStockStatus( entity.getStockStatus() );
        componentItemDto.setImageUrl( entity.getImageUrl() );

        return componentItemDto;
    }

    @Override
    public List<ComponentItemDto> componentEntitiesToDtos(List<ComponentEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<ComponentItemDto> list = new ArrayList<ComponentItemDto>( entities.size() );
        for ( ComponentEntity componentEntity : entities ) {
            list.add( componentItemDto( componentEntity ) );
        }

        return list;
    }

    @Override
    public ComponentEntity createDtoEntity(ComponentCreateDto dto) {
        if ( dto == null ) {
            return null;
        }

        ComponentEntity.ComponentEntityBuilder componentEntity = ComponentEntity.builder();

        componentEntity.wareStore( mapWareStoreIdToEntity( dto.getWareStoreId() ) );
        componentEntity.imageUrl( dto.getImageUrl() );
        componentEntity.name( dto.getName() );
        componentEntity.description( dto.getDescription() );
        componentEntity.stockStatus( dto.getStockStatus() );
        componentEntity.category( dto.getCategory() );
        componentEntity.quantity( dto.getQuantity() );

        return componentEntity.build();
    }

    @Override
    public ComponentEntity editDtoEntity(ComponentEditDto dto) {
        if ( dto == null ) {
            return null;
        }

        ComponentEntity.ComponentEntityBuilder componentEntity = ComponentEntity.builder();

        componentEntity.wareStore( mapWareStoreIdToEntity( dto.getWareStoreId() ) );
        componentEntity.imageUrl( dto.getImageUrl() );
        componentEntity.id( dto.getId() );
        componentEntity.name( dto.getName() );
        componentEntity.description( dto.getDescription() );
        componentEntity.stockStatus( dto.getStockStatus() );
        componentEntity.category( dto.getCategory() );
        componentEntity.quantity( dto.getQuantity() );

        return componentEntity.build();
    }

    private int entityWareStoreId(ComponentEntity componentEntity) {
        if ( componentEntity == null ) {
            return 0;
        }
        WareStoreEntity wareStore = componentEntity.getWareStore();
        if ( wareStore == null ) {
            return 0;
        }
        int id = wareStore.getId();
        return id;
    }
}
