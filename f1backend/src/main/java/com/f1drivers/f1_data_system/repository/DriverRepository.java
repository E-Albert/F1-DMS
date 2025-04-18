package com.f1drivers.f1_data_system.repository;

import com.f1drivers.f1_data_system.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, Long> {
}
