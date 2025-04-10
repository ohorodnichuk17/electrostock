package org.example.electrostock.services;

import org.example.electrostock.constants.Roles;
import org.example.electrostock.entities.ComponentEntity;
import org.example.electrostock.entities.RoleEntity;
import org.example.electrostock.entities.UserEntity;
import org.example.electrostock.entities.UserRoleEntity;
import org.example.electrostock.repositories.ComponentRepository;
import org.example.electrostock.repositories.RoleRepository;
import org.example.electrostock.repositories.UserRepository;
import org.example.electrostock.repositories.UserRoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DatabaseSeeder {
    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ComponentRepository componentRepository;

    public DatabaseSeeder(
            UserRoleRepository userRoleRepository,
            RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            ComponentRepository componentRepository
    ) {
        this.userRoleRepository = userRoleRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.componentRepository = componentRepository;
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

}
