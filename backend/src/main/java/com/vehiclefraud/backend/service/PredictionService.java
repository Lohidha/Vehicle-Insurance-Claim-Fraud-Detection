package com.vehiclefraud.backend.service;

import com.vehiclefraud.backend.dto.ClaimPredictionRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class PredictionService {

    private final RestClient restClient;
    private final ClaimIdGenerator claimIdGenerator;

    public PredictionService(ClaimIdGenerator claimIdGenerator) {
        this.claimIdGenerator = claimIdGenerator;
        this.restClient = RestClient.builder()
                .baseUrl("http://localhost:8000")
                .build();
    }

    public ResponseEntity<?> predict(ClaimPredictionRequest request) {
        try {
            return restClient.post()
                    .uri("/predict")
                    .body(request)
                    .exchange((req, res) -> {
                        if (res.getStatusCode().isError()) {
                            Map<String, Object> errorBody = res.bodyTo(Map.class);
                            if (errorBody == null) {
                                errorBody = new HashMap<>();
                                errorBody.put("detail", "ML model is not available yet.");
                            }
                            return ResponseEntity.status(res.getStatusCode()).body(errorBody);
                        } else {
                            // Inject a unique Claim ID at the front of the response map
                            Map<String, Object> fastApiResponse = res.bodyTo(Map.class);
                            Map<String, Object> enriched = new LinkedHashMap<>();
                            enriched.put("claimId", claimIdGenerator.generate());
                            if (fastApiResponse != null) {
                                enriched.putAll(fastApiResponse);
                            }
                            return ResponseEntity.ok(enriched);
                        }
                    });
        } catch (Exception ex) {
            Map<String, String> error = new HashMap<>();
            error.put("detail", "AI prediction service is unavailable.");
            return ResponseEntity.status(503).body(error);
        }
    }
}
