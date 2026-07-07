package com.healthlink.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "doctors")
public class Doctor {

    @Id
    private String id;

    private String userId;

    private String fullName;

    private String email;

    private String phone;
    
    private String specialty;

    private String hospital;

    private String bio;

    private String profileImage;

    private double consultationFee;

    private List<String> availableDays;

    private List<String> availableTimes;

    private double rating;

    private int totalReviews;
    
}
