package com.healthlink.backend.service;

import com.healthlink.backend.model.Appointment;
import com.healthlink.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment bookAppointment(Appointment appointment) {
        appointment.setStatus("PENDING");
        return appointmentRepository.save(appointment);
    }

    public Optional<Appointment> getAppointmentById(String id) {
        return appointmentRepository.findById(id);
    }

    public List<Appointment> getAppointmentsByPatientId(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAppointmentsByDoctorId(String doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public List<Appointment> getAppointmentsByStatus(String status) {
        return appointmentRepository.findByStatus(status);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment updateAppointmentStatus(String id, String status) {
        return appointmentRepository.findById(id).map(Appointment -> {
            Appointment.setStatus(status);
            return appointmentRepository.save(Appointment);
        }).orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public Appointment addDoctorNotes(String id, String Notes) {
        return appointmentRepository.findById(id).map(Appointment -> {
            Appointment.setNotes(Notes);
            Appointment.setStatus("COMPLETED");
            return appointmentRepository.save(Appointment);
        }).orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public Appointment cancelAppointment(String id) {
        return appointmentRepository.findById(id).map(Appointment -> {
            Appointment.setStatus("CANCELLED");
            return appointmentRepository.save(Appointment);
        }).orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public void deleteAppointment(String id) {
        appointmentRepository.deleteById(id);
    }
}
