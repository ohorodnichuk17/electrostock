package org.example.electrostock.mapper;

import org.example.electrostock.dto.component.ComponentCreateDto;
import org.example.electrostock.dto.component.ComponentEditDto;
import org.example.electrostock.dto.component.ComponentItemDto;
import org.example.electrostock.entities.ComponentEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ComponentMapper {
    ComponentItemDto componentItemDto(ComponentEntity entity);
    List<ComponentItemDto> componentEntitiesToDtos(List<ComponentEntity> entities);
    ComponentEntity createDtoEntity(ComponentCreateDto dto);
    ComponentEntity editDtoEntity(ComponentEditDto dto);
}
