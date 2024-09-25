import React, { useState } from 'react';
import './Albums.css'

const Albums = () => {
  const [albumName, setAlbumName] = useState('');
  const [albumDescription, setAlbumDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const album = {
      album_name: albumName,
      album_description: albumDescription,
      start_date: startDate,
      end_date: endDate,
      album_is_active: isActive
    };

    try {
      const response = await fetch('http://localhost:8080/api/addAlbums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(album)
      });

      if (response.ok) {
        // Ensure the response contains valid JSON before parsing
        const data = await response.json().catch(() => null);
        if (data) {
          alert('Album created successfully!');
          setAlbumName('');
          setAlbumDescription('');
          setStartDate('');
          setEndDate('');
          setIsActive(true);
        } else {
          alert('Album created but response is not a valid JSON.');
        }
      } else {
        const errorText = await response.text();
        alert(`Error creating album: ${errorText}`);
      }
    } catch (error) {
      console.error('Error creating album:', error);
      alert('Error creating album. Please try again later.');
    }
  };

  return (
    <div className="album-form-container">
      <h2>Create Album</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Album Name:</label>
          <input
            type="text"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Album Description:</label>
          <input
            type="text"
            value={albumDescription}
            onChange={(e) => setAlbumDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Is Active
          </label>
        </div>
        <button type="submit">Create Album</button>
      </form>
    </div>
  );
};

export default Albums;
