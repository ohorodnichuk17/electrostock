package org.example.electrostock.repositories;

import org.example.electrostock.entities.UserEntity;
import org.example.electrostock.entities.UserRoleEntity;
import org.example.electrostock.entities.UserRolePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRoleEntity, UserRolePK> {
    List<UserRoleEntity> findByUser(UserEntity user);
}
