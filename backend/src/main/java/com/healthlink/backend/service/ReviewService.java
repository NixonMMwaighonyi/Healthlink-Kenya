package com.healthlink.backend.service;

import com.healthlink.backend.model.Doctor;
import com.healthlink.backend.model.Review;
import com.healthlink.backend.repository.DoctorRepository;
import com.healthlink.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.OptionalDouble;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public Review submitReview(Review review) {
        review.setReviewDate(LocalDateTime.now());
        Review savedReview = reviewRepository.save(review);
        updateDoctorRating(review.getDoctorId());
        return savedReview;
    }

    public List<Review> getReviewsByDoctor(String doctorId) {
        return reviewRepository.findByDoctorId(doctorId);
    }

    public List<Review> getReviewsByPatient(String patientId) {
        return reviewRepository.findByPatientId(patientId);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public void deleteReview(String id) {
        reviewRepository.deleteById(id);
    }

    private void updateDoctorRating(String doctorId) {
        List<Review> reviews = reviewRepository.findByDoctorId(doctorId);

        OptionalDouble average = reviews.stream()
                .mapToInt(Review::getRating)
                .average();

        doctorRepository.findById(doctorId).ifPresent(doctor -> {
            doctor.setRating(average.orElse(0.0));
            doctor.setTotalReviews(reviews.size());
            doctorRepository.save(doctor);
        });
    }
}    