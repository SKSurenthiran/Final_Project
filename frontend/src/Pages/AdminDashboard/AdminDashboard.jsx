import React, { useState } from 'react';
import './AdminDashboard.css';
import ServiceManagement from '../../components/ServiceManagement/ServiceManagement';
import UserManagement from '../../components/UserManagement/UserManagement';
import AppointmentManagement from '../../components/AppointmentManagement/AppointmentManagement';
import InventoryManagement from '../../components/InventoryManagement/InventoryManagement'; 
import CreateInvoice from '../../components/CreateInvoice/CreateInvoice'; 
import Help from '../../components/Help/Help';
import { useNavigate } from 'react-router-dom';

function AdminDashboard({ onLogout }) {
    const [selectedComponent, setSelectedComponent] = useState('service-management');
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'service-management':
                return <ServiceManagement />;
            case 'user-management':
                return <UserManagement />;
            case 'appointment-management':
                return <AppointmentManagement />;
            case 'inventory-management':
                return <InventoryManagement />;
            case 'create-invoice':
                return <CreateInvoice />;
            case 'help':
                return <Help />;
            default:
                return <div>Welcome to the Admin Dashboard</div>;
        }
    };

    return (
        <div className='admin-dashboard-body'>
            <div className="admin-left-panel">
                <h3>Welcome to the Dashboard</h3>
                <div className="nav-bar">
                    <ul>
                        <li><button onClick={() => setSelectedComponent('service-management')}><i className='bx bx-book-content'></i>Service Management</button></li>
                        <li><button onClick={() => setSelectedComponent('user-management')}><i className='bx bxs-user-rectangle'></i>User Management</button></li>
                        <li><button onClick={() => setSelectedComponent('appointment-management')}><i className='bx bx-calendar-check'></i>Appointment Management</button></li>
                        <li><button onClick={() => setSelectedComponent('inventory-management')}><i className='bx bx-package'></i>Inventory Management</button></li>
                        <li><button onClick={() => setSelectedComponent('create-invoice')}><i className='bx bx-receipt'></i>Create Invoice</button></li>
                        <li><button onClick={() => setSelectedComponent('help')}><i className='bx bx-help-circle'></i>Help</button></li>
                        <li><button onClick={handleLogout}><i className='bx bx-log-out'></i>Logout</button></li>
                    </ul>
                </div>
            </div>
            <div className="admin-right-panel">
                {renderComponent()}
            </div>
        </div>
    );
}

export default AdminDashboard;
