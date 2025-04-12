package org.example.electrostock.repositories;

import org.example.electrostock.entities.UserEntity;
import org.example.electrostock.entities.WareStoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WareStoreRepository extends JpaRepository<WareStoreEntity, Integer> {
    Optional<WareStoreEntity> findByName(String name);
}
