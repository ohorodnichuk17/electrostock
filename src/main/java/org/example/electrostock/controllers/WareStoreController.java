package org.example.electrostock.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.electrostock.dto.warestore.WareStoreCreateDto;
import org.example.electrostock.dto.warestore.WareStoreItemDto;
import org.example.electrostock.entities.WareStoreEntity;
import org.example.electrostock.mapper.WareStoreMapper;
import org.example.electrostock.repositories.WareStoreRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/ware-store")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class WareStoreController {
    private final WareStoreRepository wareStoreRepository;
    private final WareStoreMapper wareStoreMapper;

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

}
