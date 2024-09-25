import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterStudents.css';

function RegisterStudents() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState({ id: '', name: '', mobile: '' });
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [searchSuccessful, setSearchSuccessful] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [student, setStudent] = useState({
    student_name: '',
    student_address: '',
    student_gender: '',
    photo_url: '',
    student_dob: '',
    student_qualification: '',
    student_mobile: '',
    course: '',
    batch: ''
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://localhost:7158/api/Courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (student.course) {
      const fetchBatches = async () => {
        try {
          const response = await fetch(`https://localhost:7158/api/Batch/getBatchByCourseId/${student.course}`);
          const data = await response.json();
          setBatches(data);
        } catch (error) {
          console.error('Error fetching batches:', error);
        }
      };

      fetchBatches();
    }
  }, [student.course]);

  const handleSearchSubmit = async (type) => {
    setSearchAttempted(true);
    try {
      let response;
      if (type === 'id') {
        response = await fetch(`https://localhost:7158/api/Enquiries/${searchInput.id}`);
      } else if (type === 'name') {
        response = await fetch(`https://localhost:7158/api/Enquiries/getByName/${searchInput.name}`);
      } else if (type === 'mobile') {
        response = await fetch(`https://localhost:7158/api/Enquiries/getByMobile/${searchInput.mobile}`);
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data) {
        setSelectedEnquiry(data);
        setSearchSuccessful(true);
        setStudent({
          ...student,
          student_name: data.studentName,
          student_mobile: data.enquirerMobile,
          student_address: data.enquirerAddress,
          // Add other fields as necessary
        });
      } else {
        setSelectedEnquiry(null);
        setSearchSuccessful(false);
      }
    } catch (error) {
      console.error('Error fetching enquiry:', error);
      setSearchSuccessful(false);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      studentName: student.student_name,
      studentAddress: student.student_address,
      studentGender: student.student_gender,
      photoUrl: student.photo_url,
      studentDob: student.student_dob,
      studentQualification: student.student_qualification,
      studentMobile: student.student_mobile,
      courseId: parseInt(student.course),
      batchId: parseInt(student.batch)
    };

    console.log('Submitting student:', payload);

    try {
      const response = await fetch('https://localhost:7158/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        if (selectedEnquiry) {
          const updateEnquiryPayload = {
            ...selectedEnquiry,
            enquiryProcessedFlag: true
          };

          const enquiryResponse = await fetch(`https://localhost:7158/api/Enquiries/updateEnquiryProcessedFlag/${selectedEnquiry.enquiryId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateEnquiryPayload)
          });

          if (enquiryResponse.ok) {
            console.log('Enquiry updated successfully with enquiryProcessedFlag set to true');
          } else {
            console.error('Error updating enquiry');
          }
        }

        // Navigate to payment page after successful registration
        navigate(`/payment/${student.batch}/${payload.studentMobile}`);
      } else {
        console.error('Error registering student');
      }
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-students-container"><br /><br />
      <h1>Register Students</h1>
      <div className="search-container">
        <div className="search-item">
          <input
            type="text"
            placeholder="Search by Enquiry ID"
            value={searchInput.id}
            onChange={(e) => setSearchInput({ ...searchInput, id: e.target.value })}
          />
          <button onClick={() => handleSearchSubmit('id')}>Search by ID</button>
        </div>
        <div className="search-item">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchInput.name}
            onChange={(e) => setSearchInput({ ...searchInput, name: e.target.value })}
          />
          <button onClick={() => handleSearchSubmit('name')}>Search by Name</button>
        </div>
        <div className="search-item">
          <input
            type="text"
            placeholder="Search by Mobile"
            value={searchInput.mobile}
            onChange={(e) => setSearchInput({ ...searchInput, mobile: e.target.value })}
          />
          <button onClick={() => handleSearchSubmit('mobile')}>Search by Mobile</button>
        </div>
      </div>
      {searchAttempted && !searchSuccessful && (
        <div>
          <p>No enquiry found. Please try searching again or add a new enquiry.</p>
          <button onClick={() => navigate('/add-enquiry')}>Add Enquiry</button>
        </div>
      )}
      {searchSuccessful && selectedEnquiry && (
        <div>
          <h2>Student Registration Form</h2>
          <form className="registration-form">
            <input
              type="text"
              name="student_name"
              placeholder="Student Name"
              value={student.student_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="student_address"
              placeholder="Student Address"
              value={student.student_address}
              onChange={handleChange}
            />
            <select
              name="student_gender"
              value={student.student_gender}
              onChange={handleChange}
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="photo_url"
              placeholder="Photo URL"
              value={student.photo_url}
              onChange={handleChange}
            />
            <input
              type="date"
              name="student_dob"
              placeholder="Student DOB"
              value={student.student_dob}
              onChange={handleChange}
            />
            <input
              type="text"
              name="student_qualification"
              placeholder="Student Qualification"
              value={student.student_qualification}
              onChange={handleChange}
            />
            <input
              type="text"
              name="student_mobile"
              placeholder="Student Mobile"
              value={student.student_mobile}
              onChange={handleChange}
            />
            <select name="course" value={student.course} onChange={handleChange}>
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))}
            </select>
            <select name="batch" value={student.batch} onChange={handleChange}>
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch.batchId} value={batch.batchId}>
                  {batch.batchName}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleSubmit}>Register</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default RegisterStudents;
