import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCourse.css';

const CreateCourse = () => {
  const [course, setCourse] = useState({
    course_name: '',
    course_description: '',
    course_duration: '',
    course_syllabus: '',
    age_grp_type: '',
    course_is_active: false,
    cover_photo: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
      });
      navigate('/manipulate');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="create-course-container">
      <h1>Create New Course</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input type="text" name="course_name" value={course.course_name} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="course_description" value={course.course_description} onChange={handleChange} required />
        </label>
        <label>
          Duration (hours):
          <input type="number" name="course_duration" value={course.course_duration} onChange={handleChange} required />
        </label>
        <label>
          Syllabus:
          <input type="text" name="course_syllabus" value={course.course_syllabus} onChange={handleChange} required />
        </label>
        <label>
          Age Group:
          <input type="text" name="age_grp_type" value={course.age_grp_type} onChange={handleChange} required />
        </label>
        <label>
          Active:
          <input type="checkbox" name="course_is_active" checked={course.course_is_active} onChange={handleChange} />
        </label>
        <label>
          Cover Photo URL:
          <input type="text" name="cover_photo" value={course.cover_photo} onChange={handleChange} />
        </label>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
