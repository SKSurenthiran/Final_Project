import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentTable from '../AppointmentTable/AppointmentTable';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import './AppointmentManagement.css';

function AppointmentManagement() {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/appointments');
            setAppointments(response.data);
            console.log('Fetched appointments:', response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleAddAppointment = () => {
        setSelectedAppointment(null);
        setFormVisible(true);
    };

    const handleEditAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setFormVisible(true);
    };

    const handleDeleteAppointment = async (appointmentId) => {
        try {
            await axios.delete(`http://localhost:3000/api/appointments/${appointmentId}`);
            setAppointments(appointments.filter(appointment => appointment.appointment_id !== appointmentId));
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    return (
        <div className="appointment-management">
            <h2>Appointment Management</h2>
            <button onClick={handleAddAppointment}>Add Appointment</button>
            {formVisible && (
                <AppointmentForm
                    selectedAppointment={selectedAppointment}
                    fetchAppointments={fetchAppointments}
                    setFormVisible={setFormVisible}
                />
            )}
            <AppointmentTable
                appointments={appointments}
                onEdit={handleEditAppointment}
                onDelete={handleDeleteAppointment}
            />
        </div>
    );
}

export default AppointmentManagement;
