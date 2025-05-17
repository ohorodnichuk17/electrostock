package org.example.electrostock.mapper;

import org.example.electrostock.dto.warestore.WareStoreCreateDto;
import org.example.electrostock.dto.warestore.WareStoreEditDto;
import org.example.electrostock.dto.warestore.WareStoreItemDto;
import org.example.electrostock.entities.WareStoreEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface WareStoreMapper {
    WareStoreItemDto wareStoreItemDto(WareStoreEntity entity);
    List<WareStoreItemDto> wareStoreEntitiesToDtos(List<WareStoreEntity> entities);
    WareStoreEntity wareStoreCreateDto(WareStoreCreateDto dto);
    WareStoreEntity wareStoreEditDto(WareStoreEditDto dto);
}
