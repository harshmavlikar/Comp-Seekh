import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MainContent.css';

const MainContent = () => {
  const location = useLocation();
  const { loggedInUser } = location.state || {};
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/getenq`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setEnquiries(data);
      } catch (error) {
        setError(error.message);
        console.error('There was an error fetching the enquiries!', error);
      }
    };

    fetchEnquiries();
  }, []);

  return (
    <main>
      <h2>Welcome, {loggedInUser ? loggedInUser.staff_name : 'admin'}!</h2>
      {error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Enquiry ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Query</th>
              <th>Follow-Up Date</th>
              <th>Student Name</th>
              <th>Staff Name</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(enquiry => (
              <tr key={enquiry.enquiryId}>
                <td>{enquiry.enquiryId}</td>
                <td>{enquiry.enquirerName}</td>
                <td>{enquiry.enquirerAddress}</td>
                <td>{enquiry.enquirerMobile}</td>
                <td>{enquiry.enquirerEmailId}</td>
                <td>{enquiry.enquirerQuery}</td>
                <td>{new Date(enquiry.followUpDate).toLocaleDateString()}</td>
                <td>{enquiry.studentName}</td>
                <td>{enquiry.staffId ? enquiry.staffId.staff_name : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default MainContent;
