package org.example.electrostock.mapper;

import org.example.electrostock.dto.component.ComponentCreateDto;
import org.example.electrostock.dto.component.ComponentEditDto;
import org.example.electrostock.dto.component.ComponentItemDto;
import org.example.electrostock.entities.ComponentEntity;
import org.example.electrostock.entities.WareStoreEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ComponentMapper {
    @Mapping(source = "wareStore.id", target = "wareStoreId")
    ComponentItemDto componentItemDto(ComponentEntity entity);

    @Mapping(source = "wareStoreEntity.id", target = "wareStoreId")
    List<ComponentItemDto> componentEntitiesToDtos(List<ComponentEntity> entities);

    @Mapping(source = "wareStoreId", target = "wareStore", qualifiedByName = "mapWareStoreIdToEntity")
    @Mapping(source = "imageUrl", target = "imageUrl")
    ComponentEntity createDtoEntity(ComponentCreateDto dto);

    @Mapping(source = "wareStoreId", target = "wareStore", qualifiedByName = "mapWareStoreIdToEntity")
    @Mapping(source = "imageUrl", target = "imageUrl")
    ComponentEntity editDtoEntity(ComponentEditDto dto);

    @Named("mapWareStoreIdToEntity")
    default WareStoreEntity mapWareStoreIdToEntity(int wareStoreId) {
        WareStoreEntity wareStoreEntity = new WareStoreEntity();
        wareStoreEntity.setId(wareStoreId);
        return wareStoreEntity;
    }
}

