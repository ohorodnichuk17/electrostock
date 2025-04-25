package org.example.electrostock.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.example.electrostock.constants.Status;
import org.example.electrostock.dto.component.ComponentItemDto;
import org.example.electrostock.dto.order.OrderCreateDto;
import org.example.electrostock.dto.order.OrderItemDto;
import org.example.electrostock.entities.ComponentEntity;
import org.example.electrostock.entities.OrderEntity;
import org.example.electrostock.entities.UserEntity;
import org.example.electrostock.exceptions.UnauthorizedException;
import org.example.electrostock.mapper.OrderMapper;
import org.example.electrostock.repositories.ComponentRepository;
import org.example.electrostock.repositories.OrderRepository;
import org.example.electrostock.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/order")
public class OrderController {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserRepository userRepository;
    private final ComponentRepository componentRepository;

    @Autowired
    public OrderController(OrderRepository orderRepository,
                           OrderMapper orderMapper,
                           UserRepository userRepository,
                           ComponentRepository componentRepository) {
        this.orderMapper = orderMapper;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.componentRepository = componentRepository;
    }

    private void checkAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("Unauthorized access");
        }
    }

    @PostMapping("create")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<OrderItemDto> create(@RequestBody OrderCreateDto dto) {
        checkAuth();
        try {
            if(dto.getUserId() == 0) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            if(dto.getComponentId() == 0) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            UserEntity user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User with ID " +
                            dto.getUserId() + " not found"));

            ComponentEntity component = componentRepository.findById(dto.getComponentId())
                    .orElseThrow(() -> new RuntimeException("Component with ID " +
                            dto.getComponentId() + " not found"));

            OrderEntity order = orderMapper.orderCreateDto(dto);
            order.setUser(user);
            order.setComponent(component);

            if(dto.getStatus() != null && !isValidStatus(dto.getStatus())) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            orderRepository.save(order);

            System.out.println("Received DTO: " + dto);
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            System.out.println("Authenticated user: " + auth.getName());
            OrderItemDto response = orderMapper.orderItemDto(order);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<List<OrderItemDto>> index() {
        checkAuth();
        List<OrderItemDto> orders = orderRepository.findAll()
                .stream()
                .map(orderMapper::orderItemDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(orders, HttpStatus.CREATED);
    }

    @GetMapping("/{orderId}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<OrderItemDto> index(@PathVariable int orderId) {
        checkAuth();
        var entity = orderRepository.findById(orderId).orElse(null);
        if (entity == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        var result =  orderMapper.orderItemDto(entity);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        OrderEntity order = orderRepository.findById(id).orElse(null);
        if(order == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        try {
            orderRepository.delete(order);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private boolean isValidStatus(String status) {
        return status.equals(Status.Confirmed) ||
                status.equals(Status.Delivered) ||
                status.equals(Status.InProcessing);
    }
}
