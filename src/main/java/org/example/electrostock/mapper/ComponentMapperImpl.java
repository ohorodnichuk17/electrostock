package org.example.electrostock.mapper;

import org.example.electrostock.dto.component.ComponentCreateDto;
import org.example.electrostock.dto.component.ComponentEditDto;
import org.example.electrostock.dto.component.ComponentItemDto;
import org.example.electrostock.entities.ComponentEntity;
import org.example.electrostock.entities.UserEntity;
import org.example.electrostock.entities.WareStoreEntity;
import org.example.electrostock.repositories.UserRepository;
import org.example.electrostock.repositories.WareStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ComponentMapperImpl implements ComponentMapper {

    @Autowired
    private WareStoreRepository wareStoreRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ComponentItemDto componentItemDto(ComponentEntity entity) {
        ComponentItemDto dto = new ComponentItemDto();
        dto.setId(entity.getId());
        dto.setQuantity(entity.getQuantity());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setCategory(entity.getCategory());
        dto.setManufacturer(entity.getManufacturer());
        dto.setStockStatus(entity.getStockStatus());
        dto.setPrice(entity.getPrice());
        dto.setWareStoreId(entity.getWareStore().getId());
        dto.setUserId(entity.getUser().getId());
        return dto;
    }

    @Override
    public List<ComponentItemDto> componentEntitiesToDtos(List<ComponentEntity> entities) {
        return entities.stream()
                .map(this::componentItemDto)
                .collect(Collectors.toList());
    }

    @Override
    public ComponentEntity createDtoEntity(ComponentCreateDto dto) {
        ComponentEntity entity = new ComponentEntity();
        entity.setQuantity(dto.getQuantity());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setManufacturer(dto.getManufacturer());
        entity.setStockStatus(dto.getStockStatus());
        entity.setPrice(dto.getPrice());

        // Load WareStoreEntity by ID
        WareStoreEntity wareStore = wareStoreRepository.findById(dto.getWareStoreId())
                .orElseThrow(() -> new RuntimeException("WareStore not found with id: " + dto.getWareStoreId()));
        entity.setWareStore(wareStore);

        // Load UserEntity by ID
        UserEntity user = userRepository.findById(dto.getSupplierId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getSupplierId()));
        entity.setUser(user);

        return entity;
    }

    @Override
    public ComponentEntity editDtoEntity(ComponentEditDto dto) {
        ComponentEntity entity = new ComponentEntity();
        entity.setId(dto.getId()); // Ensure the ID is set for updates
        entity.setQuantity(dto.getQuantity());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setManufacturer(dto.getManufacturer());
        entity.setStockStatus(dto.getStockStatus());
        entity.setPrice(dto.getPrice());

        if (dto.getWareStoreId() != 0) {
            WareStoreEntity wareStore = wareStoreRepository.findById(dto.getWareStoreId())
                    .orElseThrow(() -> new RuntimeException("WareStore not found with id: " + dto.getWareStoreId()));
            entity.setWareStore(wareStore);
        }

        if (dto.getSupplierId() != 0) {
            UserEntity user = userRepository.findById(dto.getSupplierId())
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getSupplierId()));
            entity.setUser(user);
        }

        return entity;
    }
}