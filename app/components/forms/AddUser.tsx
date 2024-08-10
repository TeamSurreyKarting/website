'use client';

import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import { AddUser } from './actions';

const AddUserForm = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState({});

    return (
        <form className="m-5" onSubmit={handleSubmit(async (values: FieldValues) => {
            AddUser(values)
            setData(values);
        })}>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    {...register('firstName')}
                    required
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    {...register('lastName')}
                />
            </div>
            <div>
                <label>Date of Birth</label>
                <input
                    type="date"
                    {...register('dateOfBirth')}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    {...register('email')}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="text"
                    {...register('password')}
                    required
                />
            </div>
            <div>
                <label>Membership</label>
                <select
                    {...register('membership')}
                >
                    <option value="">Select Membership</option>
                    <option value="Professional">Professional</option>
                    <option value="Social">Social</option>
                </select>
            </div>
            <button type="submit">Add User</button>
            {/* For Testing Purposes */}
            <pre className="text-green-400 bg-slate-900 p-4 rounded-md">{JSON.stringify(data, null, 2)}</pre>
        </form>
    );
}

export default AddUserForm;