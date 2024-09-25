// AddEnquiry.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddEnquiry.css';

function AddEnquiry() {
    const location = useLocation();
    const navigate = useNavigate();
    //const { staffId } = location.state || {}; // Get staffId from location.state
    const { state } = useLocation();
    const staffId = sessionStorage.getItem('staffId');
    const [courses, setCourses] = useState([]);
    const [enquiry, setEnquiry] = useState({
        enquirerName: '',
        enquirerAddress: '',
        enquirerMobile: '',
        enquirerAlternateMobile: '',
        enquirerEmailId: '',
        enquirerQuery: '',
        studentName: '',
        courseId: '', // Add courseId to the enquiry state
        staffId: staffId || '', // Use the staffId if available
        followUpDate: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch courses from the API
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://localhost:7158/api/Courses');
                console.log("staffID"+staffId);
                console.log('Location state:', location.state); // Log the entire location state
console.log('Staff ID from location state:', staffId); // Log the extracted staffId

                if (!response.ok) throw new Error('Failed to fetch courses');
                const data = await response.json();
                setCourses(data); // Store courses in state
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Failed to load courses');
            }
        };

        fetchCourses();
    }, []);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEnquiry(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDate = new Date();
            const followUpDate = new Date(currentDate);
            followUpDate.setDate(currentDate.getDate() + 3); // Set followUpDate 3 days ahead of current date

            const formattedCurrentDate = currentDate.toISOString().split('T')[0];
            const formattedFollowUpDate = followUpDate.toISOString().split('T')[0]; // Format followUpDate

            const enquiryData = { 
                ...enquiry, 
                enquiryDate: formattedCurrentDate,
                followUpDate: formattedFollowUpDate, // Include followUpDate in the submitted data
            }

            if (!enquiryData.staffId) {
                throw new Error('Staff ID is missing');
            }
            
            console.log('Submitting Enquiry Data:', enquiryData);

            const response = await fetch('https://localhost:7158/api/Enquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(enquiryData),
            });

            if (!response.ok) throw new Error('Failed to submit enquiry');

            // Navigate to Staffdash and pass loggedInUser state
            navigate('/staffdash', { state: { staffId: staffId } });
        } catch (error) {
            console.error('Error submitting enquiry:', error);
            setError('Error submitting enquiry. Please check the console for details.');
        }
    };
    

    return (
            <div className="add-enquiry-container"><br /><br /><br />
                <h1>Add Enquiry</h1>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Enquirer Name:
                        <input type="text" name="enquirerName" value={enquiry.enquirerName} onChange={handleChange} required />
                    </label>
                    <label>
                        Student Name:
                        <input type="text" name="studentName" value={enquiry.studentName} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Address:
                        <input type="text" name="enquirerAddress" value={enquiry.enquirerAddress} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Mobile:
                        <input type="text" name="enquirerMobile" value={enquiry.enquirerMobile} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Alternate Mobile:
                        <input type="text" name="enquirerAlternateMobile" value={enquiry.enquirerAlternateMobile} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="enquirerEmailId" value={enquiry.enquirerEmailId} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Query:
                        <textarea name="enquirerQuery" value={enquiry.enquirerQuery} onChange={handleChange} required></textarea>
                    </label>
                    <br />
                    <label>
                        Course:
                        <select name="courseId" value={enquiry.courseId} onChange={handleChange} required>
                            <option value="">Select a course</option>
                            {courses.map(course => (
                                <option key={course.courseId} value={course.courseId}>
                                    {course.courseName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <br />
                    <button type="submit">Save</button>
                </form>
            </div>
        );
    }

export default AddEnquiry;
