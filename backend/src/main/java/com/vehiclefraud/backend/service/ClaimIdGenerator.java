package com.vehiclefraud.backend.service;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Generates unique, human-readable Claim IDs in the format CLM-YYYYMMDD-NNNN.
 * The sequence counter resets each calendar day.
 * Thread-safe via AtomicInteger for concurrent request handling.
 */
@Component
public class ClaimIdGenerator {

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("yyyyMMdd");

    private volatile String currentDateStr = "";
    private final AtomicInteger counter = new AtomicInteger(0);

    public synchronized String generate() {
        String today = LocalDate.now().format(DATE_FMT);
        if (!today.equals(currentDateStr)) {
            currentDateStr = today;
            counter.set(0);
        }
        int seq = counter.incrementAndGet();
        return String.format("CLM-%s-%04d", currentDateStr, seq);
    }
}
