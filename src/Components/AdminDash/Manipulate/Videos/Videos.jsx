import React, { useState, useEffect } from 'react';
import './Videos.css';

const Videos = () => {
  const [videoPath, setVideoPath] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [isAlbumCover, setIsAlbumCover] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [albums, setAlbums] = useState([]);

  // Fetch albums for the dropdown
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/getAlbums');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const video = {
      video_path: videoPath,
      video_url: videoUrl,
      album_id: { album_id: albumId },
      is_album_cover: isAlbumCover,
      video_is_active: isActive
    };

    try {
      const response = await fetch('http://localhost:8080/api/addVideos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(video)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Video created successfully!');
        setVideoPath('');
        setVideoUrl('');
        setAlbumId('');
        setIsAlbumCover(false);
        setIsActive(true);
      } else {
        alert('Error creating video');
      }
    } catch (error) {
      console.error('Error creating video:', error);
      alert('Error creating video. Please try again later.');
    }
  };

  return (
    <div className="video-form-container">
      <h2>Create Video</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Video Path:</label>
          <input
            type="text"
            value={videoPath}
            onChange={(e) => setVideoPath(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Video URL:</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Album:</label>
          <select
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            required
          >
            <option value="">Select Album</option>
            {albums.map(album => (
              <option key={album.album_id} value={album.album_id}>
                {album.album_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isAlbumCover}
              onChange={(e) => setIsAlbumCover(e.target.checked)}
            />
            Is Album Cover
          </label>
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
        <button type="submit">Create Video</button>
      </form>
    </div>
  );
};

export default Videos;
