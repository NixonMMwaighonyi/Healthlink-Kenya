package com.healthlink.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "reviews")
public class Review {

    @Id
    private String id;

    private String patientId;

    private String doctorId;

    private String patientName;

    private String doctorName;

    private int rating;

    private String comment;

    private LocalDateTime reviewDate;
    
}
