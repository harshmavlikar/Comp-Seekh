import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FollowUpForm = ({ enquiry, onClose }) => {
    const [followUpDate, setFollowUpDate] = useState(() => {
        const today = new Date();
        today.setDate(today.getDate() + 3);
        return today.toISOString().split('T')[0]; // YYYY-MM-DD format
    });
    const [followUpMsg, setFollowUpMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/addFollowup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enquiryid: { enquiryId: enquiry.enquiryId },
                    staffid: { staff_id: enquiry.staffId },
                    followupdate: followUpDate,
                    followupmsg: followUpMsg,
                    isactive: true,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Follow-up added successfully');
            onClose(); // Close the form on success
            navigate('/'); // Redirect or update state as needed
        } catch (error) {
            console.error('Error adding follow-up:', error);
            alert('Failed to add follow-up');
        }
    };

    return (
        <div className="follow-up-form">
            <h2>Follow-up Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enquirer Name:</label>
                    <p>{enquiry.enquirerName || 'N/A'}</p>
                </div>
                <div>
                    <label>Student Name:</label>
                    <p>{enquiry.studentName || 'N/A'}</p>
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <p>{enquiry.enquirerMobile || 'N/A'}</p>
                </div>
                <div>
                    <label>Follow-up Date:</label>
                    <input
                        type="date"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Follow-up Message:</label>
                    <textarea
                        value={followUpMsg}
                        onChange={(e) => setFollowUpMsg(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default FollowUpForm;
