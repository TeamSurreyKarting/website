'use client';
import { useState } from 'react';

export default function AddUserForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        membership: '',
    });

    //@ts-ignore
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    //@ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert('User added successfully');
                setFormData({
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    email: '',
                    membership: '',
                });
            } else {
                alert('Error adding user');
            }
        } catch (error) {
            console.error(error);
            alert('Error submitting form');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="m-5">
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Date of Birth</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Membership</label>
                <select
                    name="membership"
                    value={formData.membership}
                    onChange={handleChange}
                >
                    <option value="">Select Membership</option>
                    <option value="Professional">Professional</option>
                    <option value="Social">Social</option>
                </select>
            </div>
            <button type="submit">Add User</button>
        </form>
    );
}