import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBatch.css';

const CreateBatch = ({ onClose }) => {
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
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/courses')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBatch(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure course_id is an integer if that's what's expected
        const batchData = {
            ...batch,
            course_id: parseInt(batch.course_id, 10) // Assuming course_id should be an integer
        };

        fetch('http://localhost:8080/api/addBatch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(batchData),
        })
            .then(response => {
                if (response.ok) {
                    alert('Batch created successfully!');
                } else {
                    return response.json().then(error => {
                        throw new Error(error.message);
                    });
                }
            })
            .catch(error => console.error('Error creating batch:', error));

            navigate('/manipulate');
    };

    return (
        <div className="create-batch-container">
            <h2>Create Batch</h2>
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
                        value={batch.batch_start_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Batch End Date:</label>
                    <input
                        type="date"
                        name="batch_end_date"
                        value={batch.batch_end_date}
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
                            <option key={course.course_id?.course_id} value={course.course_id?.course_id}>
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
                        value={batch.final_presentation_date}
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
                        value={batch.course_fees_from}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Course Fees To:</label>
                    <input
                        type="date"
                        name="course_fees_to"
                        value={batch.course_fees_to}
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
                    <button type="submit">Create</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateBatch;
