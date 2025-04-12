package org.example.electrostock.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.example.electrostock.constants.Category;
import org.example.electrostock.constants.StockStatus;
import org.example.electrostock.dto.component.ComponentCreateDto;
import org.example.electrostock.dto.component.ComponentEditDto;
import org.example.electrostock.dto.component.ComponentItemDto;
import org.example.electrostock.entities.ComponentEntity;
import org.example.electrostock.entities.WareStoreEntity;
import org.example.electrostock.exceptions.UnauthorizedException;
import org.example.electrostock.mapper.ComponentMapper;
import org.example.electrostock.repositories.ComponentRepository;
import org.example.electrostock.repositories.UserRepository;
import org.example.electrostock.repositories.WareStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/component")
public class ComponentController {
    private final ComponentRepository componentRepository;
    private final ComponentMapper componentMapper;
    private final WareStoreRepository wareStoreRepository;

    @Autowired
    public ComponentController(ComponentRepository componentRepository,
                               ComponentMapper componentMapper,
                               WareStoreRepository wareStoreRepository) {
        this.componentRepository = componentRepository;
        this.componentMapper = componentMapper;
        this.wareStoreRepository = wareStoreRepository;
    }

    private void checkuthrorization() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("Unauthorized access");
        }
    }

    @GetMapping
    public ResponseEntity<List<ComponentItemDto>> index() {
        List<ComponentItemDto> components = componentRepository.findAll()
                .stream()
                .map(componentMapper::componentItemDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(components, HttpStatus.OK);
    }

    @GetMapping("/{componentId}")
    public ResponseEntity<ComponentItemDto> getById(@PathVariable int componentId) {
        var entity = componentRepository.findById(componentId).orElse(null);
        if (entity == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        var result =  componentMapper.componentItemDto(entity);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("create")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ComponentItemDto> create(@RequestBody ComponentCreateDto dto) {
        checkuthrorization();
        try {
            if (dto.getWareStoreId() == 0) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            WareStoreEntity wareStore = wareStoreRepository.findById(dto.getWareStoreId())
                    .orElseThrow(() -> new RuntimeException("Warehouse with ID " + dto.getWareStoreId() + " not found"));

            ComponentEntity entity = componentMapper.createDtoEntity(dto);
            entity.setWareStore(wareStore);

            if (dto.getCategory() != null && !isValidCategory(dto.getCategory())) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            if (dto.getStockStatus() != null && !isValidStockStatus(dto.getStockStatus())) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            componentRepository.save(entity);

            ComponentItemDto response = componentMapper.componentItemDto(entity);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

//    @PutMapping("edit")
//    @SecurityRequirement(name = "bearerAuth")
//    public ResponseEntity<ComponentItemDto> edit(@RequestBody ComponentEditDto dto) {
//        checkuthrorization();
//        try {
//            ComponentEntity entity = componentMapper.editDtoEntity(dto);
//            componentRepository.save(entity);
//            ComponentItemDto response = componentMapper.componentItemDto(entity);
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        } catch(Exception ex) {
//            ex.printStackTrace();
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//        }
//    }

    @PutMapping("edit")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ComponentItemDto> edit(@RequestBody ComponentEditDto dto) {
        checkuthrorization();
        try {
            ComponentEntity entity = componentRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Component not found"));

            if (dto.getCategory() != null && !isValidCategory(dto.getCategory())) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            if (dto.getStockStatus() != null && !isValidStockStatus(dto.getStockStatus())) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            if (dto.getQuantity() != 0) {
                entity.setQuantity(dto.getQuantity());
            }
            if (dto.getName() != null) {
                entity.setName(dto.getName());
            }
            if (dto.getDescription() != null) {
                entity.setDescription(dto.getDescription());
            }
            if (dto.getCategory() != null) {
                entity.setCategory(dto.getCategory());
            }
            if (dto.getStockStatus() != null) {
                entity.setStockStatus(dto.getStockStatus());
            }
            if (dto.getImageUrl() != null) {
                entity.setImageUrl(dto.getImageUrl());
            }

            componentRepository.save(entity);

            ComponentItemDto response = componentMapper.componentItemDto(entity);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        ComponentEntity component = componentRepository.findById(id).orElse(null);
        if(component == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        try {
            componentRepository.delete(component);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private boolean isValidCategory(String category) {
        return category.equals(Category.Microchip) ||
                category.equals(Category.Resistor) ||
                category.equals(Category.Transistor) ||
                category.equals(Category.Controller);
    }

    private boolean isValidStockStatus(String stockStatus) {
        return stockStatus.equals(StockStatus.InStock) ||
                stockStatus.equals(StockStatus.InReserve) ||
                stockStatus.equals(StockStatus.OnOrder);
    }
}
