package org.example.electrostock.repositories;

import org.example.electrostock.entities.WareStoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WareStoreRepository extends JpaRepository<WareStoreEntity, Integer> {
}
