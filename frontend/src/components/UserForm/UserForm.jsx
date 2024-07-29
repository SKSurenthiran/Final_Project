import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserForm.css';

function UserForm({ selectedUser, fetchUsers, setFormVisible }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                username: selectedUser.username,
                password: '',
                email: selectedUser.email,
                phone: selectedUser.phone,
            });
        }
    }, [selectedUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedUser) {
                // Update user
                await axios.put(`http://localhost:3000/api/users/${selectedUser.user_id}`, formData);
            } else {
                // Add user
                await axios.post('http://localhost:3000/api/users/register', formData);
            }
            fetchUsers();
            setFormVisible(false);
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <div className="user-form">
            <h3>{selectedUser ? 'Edit User' : 'Add User'}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    autoComplete='off'
                    spellCheck="false"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required={!selectedUser}
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    autoComplete='off'
                    spellCheck="false"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    autoComplete='off'
                    spellCheck="false"
                    required
                />
                <button type="submit">{selectedUser ? 'Update' : 'Add'}</button>
                <button type="button" onClick={() => setFormVisible(false)}>Cancel</button>
            </form>
        </div>
    );
}

export default UserForm;
