package com.f1drivers.f1_data_system.service;//exception that handles wrong file name errors. Prevents system from crashing
import com.f1drivers.f1_data_system.model.Driver;
import com.f1drivers.f1_data_system.repository.DriverRepository;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
//allows files to be read
import java.io.File;
//a dynamic array
import java.util.*;
//an interface used to maintain order of elements
//used to compare objects
//used to read user input


/**
 * Has CLI logic
 */
@Service
public class DriverManager {
    private final DriverRepository driverRepo;

    public DriverManager(DriverRepository driverRepo) {
        this.driverRepo = driverRepo;
    }

    // Get all drivers
    public List<Driver> getAllDrivers() {
        return driverRepo.findAll();
    }

    // Add a driver (with simple validation)
    public Driver addDriver(Driver driver) {
        if (driver.getNumberOfWins() > driver.getNumberOfRaces()) {
            throw new IllegalArgumentException("Wins cannot exceed number of races.");
        }
        return driverRepo.save(driver);
    }

    // Get a driver by ID
    public Optional<Driver> getDriverById(Long id) {
        return driverRepo.findById(id);
    }

    // Remove a driver by ID
    public void removeDriver(Long id) {
        if (!driverRepo.existsById(id)) {
            throw new IllegalArgumentException("Driver with ID " + id + " not found.");
        }
        driverRepo.deleteById(id);
    }

    // Update driver details
    public Driver updateDriver(Long id, Driver updatedDriver) {
        return driverRepo.findById(id).map(driver -> {
            driver.setDriverName(updatedDriver.getDriverName());
            driver.setDriverNumber(updatedDriver.getDriverNumber());
            driver.setCurrentTeam(updatedDriver.getCurrentTeam());
            driver.setAge(updatedDriver.getAge());
            driver.setNationality(updatedDriver.getNationality());
            driver.setNumberOfRaces(updatedDriver.getNumberOfRaces());
            driver.setNumberOfWins(updatedDriver.getNumberOfWins());
            driver.setIsActiveDriver(updatedDriver.getIsActiveDriver());
            driver.setHeight(updatedDriver.getHeight());
            driver.setCareerPoints(updatedDriver.getCareerPoints());
            return driverRepo.save(driver);
        }).orElseThrow(() -> new IllegalArgumentException("Driver with ID " + id + " not found."));
    }

    // Calculate win ratio for a driver by ID
    public double calculateWinRatio(Long id) {
        return driverRepo.findById(id).map(driver -> {
            int wins = driver.getNumberOfWins();
            int races = driver.getNumberOfRaces();
            if (races == 0) {
                throw new IllegalStateException("Driver has no races entered.");
            }
            return (double) wins / races;
        }).orElseThrow(() -> new IllegalArgumentException("Driver with ID " + id + " not found."));
    }

}
