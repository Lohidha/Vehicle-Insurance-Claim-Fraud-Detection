package com.vehiclefraud.backend.controller;

import com.vehiclefraud.backend.dto.ClaimPredictionRequest;
import com.vehiclefraud.backend.service.PredictionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Enable CORS for React
public class PredictionController {

    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping("/predict")
    public ResponseEntity<?> predict(@RequestBody ClaimPredictionRequest request) {
        return predictionService.predict(request);
    }
}
