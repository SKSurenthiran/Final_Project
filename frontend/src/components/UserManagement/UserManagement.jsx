import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../UserTable/UserTable';
import UserForm from '../UserForm/UserForm';
import './UserManagement.css';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users');
            setUsers(response.data);
            console.log('Fetched users:', response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setFormVisible(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setFormVisible(true);
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            setUsers(users.filter(user => user.user_id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="user-management">
            <h2>User Management</h2>
            <button onClick={handleAddUser}>Add User</button>
            {formVisible && (
                <UserForm
                    selectedUser={selectedUser}
                    fetchUsers={fetchUsers}
                    setFormVisible={setFormVisible}
                />
            )}
            <UserTable
                users={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
            />
        </div>
    );
}

export default UserManagement;
