import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Staff.css';

// A helper function to fetch data
const fetchData = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStaff, setEditingStaff] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staffData = await fetchData('http://localhost:8080/api/staff');
        setStaff(staffData);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleEditStaff = (staff) => {
    setEditingStaff(staff);
  };

  const handleUpdateStaff = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/staff/${editingStaff.staff_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStaff),
      });

      if (response.ok) {
        const updatedStaff = await response.json();
        setStaff((prev) => prev.map((staff) => (staff.staff_id === updatedStaff.staff_id ? updatedStaff : staff)));
        setEditingStaff(null);
      }
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  const handleDeleteStaff = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/staff/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStaff((prev) => prev.filter((staff) => staff.staff_id !== id));
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="staff-crud-container">
      <h2>Staff</h2>
      <Link to="/createstaff">Create New Staff</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Photo URL</th>
            <th>Role</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staff) => (
            <tr key={staff.staff_id}>
              <td>{staff.staff_id}</td>
              <td>{staff.staff_name}</td>
              <td>{staff.photo_url}</td>
              <td>{staff.staff_role}</td>
              <td>{staff.staff_mobile}</td>
              <td>{staff.staff_email}</td>
              <td>{staff.staff_username}</td>
              <td>
                <button onClick={() => handleEditStaff(staff)}>Edit</button>
                <button onClick={() => handleDeleteStaff(staff.staff_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingStaff && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateStaff(); }}>
          <h3>Edit Staff</h3>
          <input
            type="text"
            name="staff_name"
            value={editingStaff.staff_name}
            onChange={(e) => setEditingStaff({ ...editingStaff, staff_name: e.target.value })}
            required
          />
          <input
            type="text"
            name="photo_url"
            value={editingStaff.photo_url}
            onChange={(e) => setEditingStaff({ ...editingStaff, photo_url: e.target.value })}
            required
          />
          <input
            type="text"
            name="staff_role"
            value={editingStaff.staff_role}
            onChange={(e) => setEditingStaff({ ...editingStaff, staff_role: e.target.value })}
            required
          />
          <input
            type="text"
            name="staff_mobile"
            value={editingStaff.staff_mobile}
            onChange={(e) => setEditingStaff({ ...editingStaff, staff_mobile: e.target.value })}
            required
          />
          <input
            type="email"
            name="staff_email"
            value={editingStaff.staff_email}
            onChange={(e) => setEditingStaff({ ...editingStaff, staff_email: e.target.value })}
            required
          />
          <input
            type="text"
            name="staff_username"
            value={editingStaff.staff_username}
            onChange={(e) => setEditingStaff({ ...editingStaff, staff_username: e.target.value })}
            required
          />
          <input
            type="password"
            name="staff_password"
            value={editingStaff.staff_password}
            onChange={(e) => setEditingStaff({ ...editingStaff, staff_password: e.target.value })}
            required
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default Staff;
