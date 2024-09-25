import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './CreateStaff.css';

const CreateStaff = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    staff_name: '',
    photo_url: '',
    staff_role: '',
    staff_mobile: '',
    staff_email: '',
    staff_username: '',
    staff_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/manipulate'); // Navigate back to the Manipulate page after successful creation
      }
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  return (
    <div>
      <h2>Create New Staff</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="staff_name"
          placeholder="Name"
          value={formData.staff_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="photo_url"
          placeholder="Photo URL"
          value={formData.photo_url}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="staff_role"
          placeholder="Role"
          value={formData.staff_role}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="staff_mobile"
          placeholder="Mobile"
          value={formData.staff_mobile}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="staff_email"
          placeholder="Email"
          value={formData.staff_email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="staff_username"
          placeholder="Username"
          value={formData.staff_username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="staff_password"
          placeholder="Password"
          value={formData.staff_password}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Staff</button>
      </form>
    </div>
  );
};

export default CreateStaff;
