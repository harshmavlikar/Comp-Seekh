import React, { useState, useEffect } from 'react';
import './EditBatch.css';

const EditBatch = ({ batchId, onClose }) => {
    const [batch, setBatch] = useState({
        batch_name: '',
        batch_start_date: '',
        batch_end_date: '',
        course_id: '',
        final_presentation_date: '',
        batch_fees: '',
        course_fees_from: '',
        course_fees_to: '',
        batch_is_active: false,
    });

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch batch details
        fetch(`http://localhost:8080/api/batch/${batchId}`)
            .then(response => response.json())
            .then(data => setBatch(data))
            .catch(error => console.error('Error fetching batch details:', error));

        // Fetch courses for dropdown
        fetch('http://localhost:8080/api/courses')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses:', error));
    }, [batchId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBatch(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/batch/${batchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(batch),
        })
            .then(response => {
                if (response.ok) {
                    alert('Batch updated successfully!');
                    onClose(); // Close the form after successful update
                } else {
                    return response.json().then(error => {
                        throw new Error(error.message);
                    });
                }
            })
            .catch(error => console.error('Error updating batch:', error));
    };

    return (
        <div className="edit-batch-container">
            <h2>Edit Batch</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Batch Name:</label>
                    <input
                        type="text"
                        name="batch_name"
                        value={batch.batch_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Batch Start Date:</label>
                    <input
                        type="date"
                        name="batch_start_date"
                        value={batch.batch_start_date} // Remove time part
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Batch End Date:</label>
                    <input
                        type="date"
                        name="batch_end_date"
                        value={batch.batch_end_date} // Remove time part
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Course:</label>
                    <select
                        name="course_id"
                        value={batch.course_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Course</option>
                        {courses.map(course => (
                            <option key={course.course_id} value={course.course_id}>
                                {course.course_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Final Presentation Date:</label>
                    <input
                        type="date"
                        name="final_presentation_date"
                        value={batch.final_presentation_date ? batch.final_presentation_date : ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Batch Fees:</label>
                    <input
                        type="number"
                        name="batch_fees"
                        value={batch.batch_fees}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Course Fees From:</label>
                    <input
                        type="date"
                        name="course_fees_from"
                        value={batch.course_fees_from ? batch.course_fees_from : ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Course Fees To:</label>
                    <input
                        type="date"
                        name="course_fees_to"
                        value={batch.course_fees_to ? batch.course_fees_to : ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Active:</label>
                    <input
                        type="checkbox"
                        name="batch_is_active"
                        checked={batch.batch_is_active}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditBatch;
