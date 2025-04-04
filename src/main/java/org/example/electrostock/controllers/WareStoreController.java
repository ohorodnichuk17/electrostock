package org.example.electrostock.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.electrostock.dto.warestore.WareStoreCreateDto;
import org.example.electrostock.dto.warestore.WareStoreEditDto;
import org.example.electrostock.dto.warestore.WareStoreItemDto;
import org.example.electrostock.entities.WareStoreEntity;
import org.example.electrostock.mapper.WareStoreMapper;
import org.example.electrostock.repositories.WareStoreRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/ware-store")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class WareStoreController {
    private final WareStoreRepository wareStoreRepository;
    private final WareStoreMapper wareStoreMapper;

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
    public ResponseEntity<WareStoreItemDto> create(@RequestBody WareStoreCreateDto dto) {
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
    public ResponseEntity<WareStoreItemDto> edit(@RequestBody WareStoreEditDto dto) {
        if (dto == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

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
}
