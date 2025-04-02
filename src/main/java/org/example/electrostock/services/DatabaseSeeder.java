package org.example.electrostock.services;

import org.example.electrostock.constants.Roles;
import org.example.electrostock.entities.RoleEntity;
import org.example.electrostock.repositories.RoleRepository;
import org.example.electrostock.repositories.UserRoleRepository;
import org.springframework.stereotype.Service;

@Service
public class DatabaseSeeder {
    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;

    public DatabaseSeeder(
            UserRoleRepository userRoleRepository,
            RoleRepository roleRepository
    ) {
        this.userRoleRepository = userRoleRepository;
        this.roleRepository = roleRepository;
    }

    public void seedAllTables() {
        seedRole();
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
}
