package com.f1drivers.f1_data_system.controller;


import com.f1drivers.f1_data_system.model.Driver;
import com.f1drivers.f1_data_system.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//this controller manipulates the data in the database
@RestController
public class DriverController {

    //injecting the driver repository interface
    @Autowired
    private DriverRepository driverRepository;

    //creating data
    @PostMapping("/driver")
    Driver newDriver(@RequestBody Driver newDriver) {
        return driverRepository.save(newDriver);
    }

    //reading data
    @GetMapping("/drivers") //path
    List<Driver> getAllDrivers() {
        //method given by JPA
        return driverRepository.findAll();
    }
}
