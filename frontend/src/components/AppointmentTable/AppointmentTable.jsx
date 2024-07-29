import React from 'react';
import './AppointmentTable.css';

function AppointmentTable({ appointments, onEdit, onDelete }) {
    return (
        <table className="appointment-table">
            <thead>
                <tr>
                    <th>Appointment ID</th>
                    <th>User ID</th>
                    <th>Service ID</th>
                    <th>Appointment Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => (
                    <tr key={appointment.appointment_id}>
                        <td>{appointment.appointment_id}</td>
                        <td>{appointment.user_id}</td>
                        <td>{appointment.service_id}</td>
                        <td>{appointment.appointment_date}</td>
                        <td>{appointment.status}</td>
                        <td>
                            <button onClick={() => onEdit(appointment)}>Edit</button>
                            <button onClick={() => onDelete(appointment.appointment_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AppointmentTable;
