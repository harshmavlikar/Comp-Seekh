import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateEnquiry.css';
import Header from '../StaffDash/Navbar'

function UpdateEnquiry() {
  const { enquiryId } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/getById/${enquiryId}`);
        if (!response.ok) throw new Error('Failed to fetch enquiry');
        const data = await response.json();

        // Set default next enquiry date if not already set
        const today = new Date();
        const nextEnquiryDate = new Date(today.setDate(today.getDate() + 3));
        const formattedDate = nextEnquiryDate.toISOString().split('T')[0]; // Format date as yyyy-mm-dd

        setEnquiry(prev => ({
          ...data,
          followUpDate: data.followUpDate || formattedDate
        }));
      } catch (error) {
        setError('Error fetching enquiry');
      }
    };

    fetchEnquiry();
  }, [enquiryId]);

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
      // Update the enquiry counter
      const updatedEnquiry = {
        ...enquiry,
        enquiryCounter: (enquiry.enquiryCounter || 0) + 1,
      };

      const response = await fetch(`http://localhost:8080/api/update_enquiry/${enquiryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEnquiry),
      });

      if (!response.ok) throw new Error('Failed to update enquiry');

      // Prepare the follow-up data using existing enquiry fields
      const followupData = {
        enquiryId: enquiry.enquiryId,
        enquirerName: enquiry.enquirerName,
        enquirerEmailId: enquiry.enquirerEmailId,
        followUpDate: enquiry.followUpDate,
        followUpDetails: enquiry.enquirerQuery,
        // Add any other fields necessary for the follow-up entity
      };

      const followupResponse = await fetch('http://localhost:8080/api/followup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followupData),
      });

      if (!followupResponse.ok) throw new Error('Failed to create follow-up');

      // Navigate to the Staffdash page with the staff ID
      navigate('/staffdash', { state: { loggedInUser: { staff_id: enquiry.staffId } } });
    } catch (error) {
      console.error('Error updating enquiry or creating follow-up:', error);
      setError('Error updating enquiry or creating follow-up. Please check the console for details.');
    }
  };

  return (
    <>
    <div className="update-enquiry-container">
      <h1>Update Enquiry</h1><br />
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="enquirerName" value={enquiry.enquirerName || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="enquirerAddress" value={enquiry.enquirerAddress || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Mobile:
          <input type="text" name="enquirerMobile" value={enquiry.enquirerMobile || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="enquirerEmailId" value={enquiry.enquirerEmailId || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Follow-up Message:
          <textarea name="enquirerQuery" value={enquiry.enquirerQuery || ''} onChange={handleChange}></textarea>
        </label>
        <br />
        <label>
          Next Enquiry Date:
          <input type="date" name="followUpDate" value={enquiry.followUpDate || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Closure Reason:
          <input type="text" name="closureReason" value={enquiry.closureReason || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Student Name:
          <input type="text" name="studentName" value={enquiry.studentName || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Enquiry Completed:
          <input type="checkbox" name="enquiryProcessedFlag" checked={enquiry.enquiryProcessedFlag || false} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
    
    </>
  );
}

export default UpdateEnquiry;
