package com.vehiclefraud.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class VehicleFraudApplication {
    public static void main(String[] args) {
        SpringApplication.run(VehicleFraudApplication.class, args);
    }
}
