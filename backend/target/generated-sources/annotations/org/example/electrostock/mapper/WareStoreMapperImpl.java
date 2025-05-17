package org.example.electrostock.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.example.electrostock.dto.warestore.WareStoreCreateDto;
import org.example.electrostock.dto.warestore.WareStoreEditDto;
import org.example.electrostock.dto.warestore.WareStoreItemDto;
import org.example.electrostock.entities.ComponentEntity;
import org.example.electrostock.entities.WareStoreEntity;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-01T17:53:17+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class WareStoreMapperImpl implements WareStoreMapper {

    @Override
    public WareStoreItemDto wareStoreItemDto(WareStoreEntity entity) {
        if ( entity == null ) {
            return null;
        }

        WareStoreItemDto wareStoreItemDto = new WareStoreItemDto();

        wareStoreItemDto.setId( entity.getId() );
        wareStoreItemDto.setName( entity.getName() );
        List<ComponentEntity> list = entity.getComponents();
        if ( list != null ) {
            wareStoreItemDto.setComponents( new ArrayList<ComponentEntity>( list ) );
        }

        return wareStoreItemDto;
    }

    @Override
    public List<WareStoreItemDto> wareStoreEntitiesToDtos(List<WareStoreEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<WareStoreItemDto> list = new ArrayList<WareStoreItemDto>( entities.size() );
        for ( WareStoreEntity wareStoreEntity : entities ) {
            list.add( wareStoreItemDto( wareStoreEntity ) );
        }

        return list;
    }

    @Override
    public WareStoreEntity wareStoreCreateDto(WareStoreCreateDto dto) {
        if ( dto == null ) {
            return null;
        }

        WareStoreEntity.WareStoreEntityBuilder wareStoreEntity = WareStoreEntity.builder();

        wareStoreEntity.name( dto.getName() );

        return wareStoreEntity.build();
    }

    @Override
    public WareStoreEntity wareStoreEditDto(WareStoreEditDto dto) {
        if ( dto == null ) {
            return null;
        }

        WareStoreEntity.WareStoreEntityBuilder wareStoreEntity = WareStoreEntity.builder();

        wareStoreEntity.id( dto.getId() );
        wareStoreEntity.name( dto.getName() );

        return wareStoreEntity.build();
    }
}
