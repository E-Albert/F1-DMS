package com.f1drivers.f1_data_system.controller;


import com.f1drivers.f1_data_system.model.Driver;
import com.f1drivers.f1_data_system.repository.DriverRepository;
import com.f1drivers.f1_data_system.service.DriverManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//this controller manipulates the data in the database
@RestController
//@CrossOrigin("http://localhost:3000")
public class DriverController {

    private final DriverManager driverManager;

    public DriverController(DriverManager driverManager) {
        this.driverManager = driverManager;
    }

    // Create driver
    @PostMapping("/drivers")
    public ResponseEntity<?> createDriver(@RequestBody Driver newDriver) {
        try {
            return ResponseEntity.ok(driverManager.addDriver(newDriver));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all drivers
    @GetMapping("/drivers")
    public List<Driver> getAllDrivers() {
        return driverManager.getAllDrivers();
    }

    // Get a driver by ID
    @GetMapping("/drivers/{id}")
    public ResponseEntity<?> getDriverById(@PathVariable Long id) {
        return driverManager.getDriverById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a driver by ID
    @DeleteMapping("/drivers/{id}")
    public ResponseEntity<?> deleteDriver(@PathVariable Long id) {
        try {
            driverManager.removeDriver(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a driver
    @PutMapping("/drivers/{id}")
    public ResponseEntity<?> updateDriver(@PathVariable Long id, @RequestBody Driver updatedDriver) {
        try {
            return ResponseEntity.ok(driverManager.updateDriver(id, updatedDriver));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get win-to-race ratio for a driver
    @GetMapping("/drivers/{id}/ratio")
    public ResponseEntity<?> getWinRatio(@PathVariable Long id) {
        try {
            double ratio = driverManager.calculateWinRatio(id);
            return ResponseEntity.ok(ratio);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
