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
            var user1 = UserEntity
                    .builder()
                    .email("john.doe@example.com")
                    .firstName("John")
                    .lastName("Doe")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            userRepository.save(user1);
            var role1 = roleRepository.findByName(Roles.Supplier);
            var ur1 = UserRoleEntity
                    .builder()
                    .role(role1)
                    .user(user1)
                    .build();
            userRoleRepository.save(ur1);

            var user2 = UserEntity
                    .builder()
                    .email("emma.smith@example.com")
                    .firstName("Emma")
                    .lastName("Smith")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            userRepository.save(user2);
            var role2 = roleRepository.findByName(Roles.Supplier);
            var ur2 = UserRoleEntity
                    .builder()
                    .role(role2)
                    .user(user2)
                    .build();
            userRoleRepository.save(ur2);

            var user3 = UserEntity
                    .builder()
                    .email("michael.jones@example.com")
                    .firstName("Michael")
                    .lastName("Jones")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            userRepository.save(user3);
            var role3 = roleRepository.findByName(Roles.Supplier);
            var ur3 = UserRoleEntity
                    .builder()
                    .role(role3)
                    .user(user3)
                    .build();
            userRoleRepository.save(ur3);

            var user4 = UserEntity
                    .builder()
                    .email("olivia.brown@example.com")
                    .firstName("Olivia")
                    .lastName("Brown")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            userRepository.save(user4);
            var role4 = roleRepository.findByName(Roles.Supplier);
            var ur4 = UserRoleEntity
                    .builder()
                    .role(role4)
                    .user(user4)
                    .build();
            userRoleRepository.save(ur4);

            var user5 = UserEntity
                    .builder()
                    .email("daniel.williams@example.com")
                    .firstName("Daniel")
                    .lastName("Williams")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            userRepository.save(user5);
            var role5 = roleRepository.findByName(Roles.Supplier);
            var ur5 = UserRoleEntity
                    .builder()
                    .role(role5)
                    .user(user5)
                    .build();
            userRoleRepository.save(ur5);

            var user6 = UserEntity
                    .builder()
                    .email("sophia.miller@example.com")
                    .firstName("Sophia")
                    .lastName("Miller")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            userRepository.save(user6);
            var role6 = roleRepository.findByName(Roles.Supplier);
            var ur6 = UserRoleEntity
                    .builder()
                    .role(role6)
                    .user(user6)
                    .build();
            userRoleRepository.save(ur6);

            var user7 = UserEntity
                    .builder()
                    .email("james.davis@example.com")
                    .firstName("James")
                    .lastName("Davis")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            userRepository.save(user7);
            var role7 = roleRepository.findByName(Roles.Supplier);
            var ur7 = UserRoleEntity
                    .builder()
                    .role(role7)
                    .user(user7)
                    .build();
            userRoleRepository.save(ur7);
        }
    }

}
