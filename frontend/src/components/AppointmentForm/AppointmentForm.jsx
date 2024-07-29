import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentForm.css';

function AppointmentForm({ selectedAppointment, fetchAppointments, setFormVisible }) {
    const [formData, setFormData] = useState({
        user_id: '',
        service_id: '',
        appointment_date: '',
    });

    useEffect(() => {
        if (selectedAppointment) {
            setFormData({
                user_id: selectedAppointment.user_id,
                service_id: selectedAppointment.service_id,
                appointment_date: selectedAppointment.appointment_date,
            });
        }
    }, [selectedAppointment]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedAppointment) {
                // Update appointment
                await axios.put(`http://localhost:3000/api/appointments/${selectedAppointment.appointment_id}`, formData);
            } else {
                // Add appointment
                await axios.post('http://localhost:3000/api/appointments/create', formData);
            }
            fetchAppointments();
            setFormVisible(false);
        } catch (error) {
            console.error('Error saving appointment:', error);
        }
    };

    return (
        <div className="appointment-form">
            <h3>{selectedAppointment ? 'Edit Appointment' : 'Add Appointment'}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleInputChange}
                    placeholder="User ID"
                    required
                />
                <input
                    type="text"
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleInputChange}
                    placeholder="Service ID"
                    required
                />
                <input
                    type="datetime-local"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleInputChange}
                    placeholder="Appointment Date"
                    required
                />
                <button type="submit">{selectedAppointment ? 'Update' : 'Add'}</button>
                <button type="button" onClick={() => setFormVisible(false)}>Cancel</button>
            </form>
        </div>
    );
}

export default AppointmentForm;
