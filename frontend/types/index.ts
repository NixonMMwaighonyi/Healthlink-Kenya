export interface User {
    id: string;
    fullName: string;
    email: string;
    role: "PATIENT" | "DOCTOR" | "ADMIN";
    phone: string;
    profileImage?: string;
    enabled?: boolean;
}

export interface Doctor {
    id: string;
    userId?: string;
    fullName: string;
    email: string;
    phone: string;
    specialty: string;
    hospital: string;
    location: string;
    bio: string;
    profileImage?: string;
    consultationFee: number;
    availableDays: string[];
    availableTimes: string[];
    rating: number;
    totalReviews: number;
}

export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    doctorName: string;
    doctorSpecialty: string;
    appointmentDateTime: string;
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
    reason: string;
    notes?: string;
    fee: number;
    paid: boolean;
}

export interface Review {
    id: string;
    patientId: string;
    doctorId:  string;
    patientName: string;
    doctorName: string;
    rating: number;
    comment: string;
    reviewDate: string;
}

export interface LoginResponse {
    token: string;
    email: string;
    role: string;
}