package org.example.electrostock.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.electrostock.dto.warestore.WareStoreCreateDto;
import org.example.electrostock.dto.warestore.WareStoreEditDto;
import org.example.electrostock.dto.warestore.WareStoreItemDto;
import org.example.electrostock.entities.WareStoreEntity;
import org.example.electrostock.exceptions.UnauthorizedException;
import org.example.electrostock.mapper.WareStoreMapper;
import org.example.electrostock.repositories.WareStoreRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/ware-store")
@RequiredArgsConstructor
public class WareStoreController {
    private final WareStoreRepository wareStoreRepository;
    private final WareStoreMapper wareStoreMapper;

    private void checkAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("Unauthorized access");
        }
    }

    @GetMapping
    public ResponseEntity<List<WareStoreItemDto>> index() {
        List<WareStoreItemDto> wareStores = wareStoreRepository.findAll()
                .stream()
                .map(wareStoreMapper::wareStoreItemDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(wareStores, HttpStatus.OK);
    }

    @GetMapping("/{wareStoreId}")
    public ResponseEntity<WareStoreItemDto> getById(@PathVariable int wareStoreId) {
        var entity = wareStoreRepository.findById(wareStoreId).orElse(null);
        if (entity == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        var result =  wareStoreMapper.wareStoreItemDto(entity);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("create")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<WareStoreItemDto> create(@RequestBody WareStoreCreateDto dto) {
        checkAuthentication();
        try {
            WareStoreEntity entity = wareStoreMapper.wareStoreCreateDto(dto);
            wareStoreRepository.save(entity);
            WareStoreItemDto responseDto = wareStoreMapper.wareStoreItemDto(entity);
            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("edit")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<WareStoreItemDto> edit(@RequestBody WareStoreEditDto dto) {
        checkAuthentication();
        try {
            WareStoreEntity entity = wareStoreMapper.wareStoreEditDto(dto);
            wareStoreRepository.save(entity);
            WareStoreItemDto responseDto = wareStoreMapper.wareStoreItemDto(entity);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } catch (DataIntegrityViolationException ex) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        WareStoreEntity wareStore = wareStoreRepository.findById(id).orElse(null);
        if(wareStore == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        try {
            wareStoreRepository.delete(wareStore);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
