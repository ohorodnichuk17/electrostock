package org.example.electrostock.services;

import org.example.electrostock.constants.Roles;
import org.example.electrostock.entities.*;
import org.example.electrostock.repositories.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DatabaseSeeder {
    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ComponentRepository componentRepository;
    private final WareStoreRepository wareStoreRepository;

    public DatabaseSeeder(
            UserRoleRepository userRoleRepository,
            RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            ComponentRepository componentRepository,
            WareStoreRepository wareStoreRepository
    ) {
        this.userRoleRepository = userRoleRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.componentRepository = componentRepository;
        this.wareStoreRepository = wareStoreRepository;
    }

    public void seedAllTables() {
        seedRole();
        seedSuppliers();
    }

    private void seedRole() {
        if(roleRepository.count() == 0) {
            RoleEntity supplier = RoleEntity
                    .builder()
                    .name(Roles.Supplier)
                    .build();
            roleRepository.save(supplier);
            RoleEntity user = RoleEntity
                    .builder()
                    .name(Roles.User)
                    .build();
            roleRepository.save(user);
        }
    }

    private void seedSuppliers() {
        if(userRepository.count() == 0) {
            var user = UserEntity
                    .builder()
                    .email("supplier@gmail.com")
                    .firstName("Supplier")
                    .lastName("Supplier")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            userRepository.save(user);
            var role = roleRepository.findByName(Roles.Supplier);
            var ur = UserRoleEntity
                    .builder()
                    .role(role)
                    .user(user)
                    .build();
            userRoleRepository.save(ur);
        }
    }

    private void seedWarestores() {
        if(wareStoreRepository.count() == 0) {
            var warestore1 = WareStoreEntity
                    .builder()
                    .name("transistors")
                    .build();
            var warestore2 = WareStoreEntity
                    .builder()
                    .name("resistors")
                    .build();
            var warestore3 = WareStoreEntity
                    .builder()
                    .name("microchips")
                    .build();
            var warestore4 = WareStoreEntity
                    .builder()
                    .name("controllers")
                    .build();
            wareStoreRepository.save(warestore1);
            wareStoreRepository.save(warestore2);
            wareStoreRepository.save(warestore3);
            wareStoreRepository.save(warestore4);
        }
    }
}
