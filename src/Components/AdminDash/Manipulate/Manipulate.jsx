import React, { useState, useEffect } from 'react';
import './Manipulate.css';
import Header from '../../AdminDash/Header/Navbar'
import Staff from '../Manipulate/Staff/Staff'
import Images from './Images/ImagesUpload'
import Albums from '../Manipulate/Albums/Albums'
import Courses from '../Manipulate/Courses/Courses'
import Batches from '../Manipulate/Batches/Batches'
import Videos from '../Manipulate/Videos/Videos'


// A helper function to fetch data
const fetchData = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Manipulate = () => {
 /*  // States for storing data and loading states
  const [staff, setStaff] = useState([]);
  const [images, setImages] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
 */
/*   // Fetch data on component mount
  useEffect(() => {
    const fetchDataFromAllControllers = async () => {
      try {
        const staffData = await fetchData('http://localhost:8080/api/staff');
        const imagesData = await fetchData('http://localhost:8080/api/images');
        const albumsData = await fetchData('http://localhost:8080/api/albums');
        const videosData = await fetchData('http://localhost:8080/api/videos');
        const coursesData = await fetchData('http://localhost:8080/api/courses');
        const batchesData = await fetchData('http://localhost:8080/api/batches');
        
        setStaff(staffData);
        setImages(imagesData);
        setAlbums(albumsData);
        setVideos(videosData);
        setCourses(coursesData);
        setBatches(batchesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromAllControllers();
  }, []);

  // Render loading or data
  if (loading) {
    return <div>Loading...</div>;
  } */

  return (
    <div className="manipulate-container">
      <Header/>
      <br/><br/>
      <div className="grid">
        <div className="grid-item">
          <Staff/>
        </div>
        <div className="grid-item">
          <h2>Images</h2>
          <Images/>
        </div>
        <div className="grid-item">
          <h2>Albums</h2>
          <Albums/>
        </div>
        <div className="grid-item">
          <h2>Videos</h2>
          <Videos/>
        </div>
        <div className="grid-item">
          <h2>Courses</h2>
          <Courses/>
        </div>
        <div className="grid-item">
          <h2>Batches</h2>
          <Batches/>
        </div>
      </div>
    </div>
  );
};

export default Manipulate;
