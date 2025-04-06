package org.example.electrostock.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.example.electrostock.dto.component.ComponentCreateDto;
import org.example.electrostock.dto.component.ComponentEditDto;
import org.example.electrostock.dto.component.ComponentItemDto;
import org.example.electrostock.entities.ComponentEntity;
import org.example.electrostock.exceptions.UnauthorizedException;
import org.example.electrostock.mapper.ComponentMapper;
import org.example.electrostock.repositories.ComponentRepository;
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

    @Autowired
    public ComponentController(ComponentRepository componentRepository,
                               ComponentMapper componentMapper) {
        this.componentRepository = componentRepository;
        this.componentMapper = componentMapper;
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
            ComponentEntity entity = componentMapper.createDtoEntity(dto);
            componentRepository.save(entity);
            ComponentItemDto response = componentMapper.componentItemDto(entity);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch(Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("edit")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ComponentItemDto> create(@RequestBody ComponentEditDto dto) {
        checkuthrorization();
        try {
            ComponentEntity entity = componentMapper.editDtoEntity(dto);
            componentRepository.save(entity);
            ComponentItemDto response = componentMapper.componentItemDto(entity);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
