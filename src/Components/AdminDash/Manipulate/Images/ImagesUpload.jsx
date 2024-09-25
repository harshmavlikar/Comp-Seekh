import React, { useState, useEffect } from 'react';

const ImageUpload = () => {
  const [imagePath, setImagePath] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [isAlbumCover, setIsAlbumCover] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch albums from the API to populate the dropdown
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

    const image = {
      image_path: imagePath,
      album_id: { album_id: albumId },
      is_album_cover: isAlbumCover,
      image_is_active: isActive
    };

    try {
      const response = await fetch('http://localhost:8080/api/addImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Image uploaded successfully!');
        setImagePath('');
        setAlbumId('');
        setIsAlbumCover(false);
        setIsActive(true);
      } else {
        alert('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image Path:</label>
          <input
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Album:</label>
          <select value={albumId} onChange={(e) => setAlbumId(e.target.value)} required>
            <option value="" disabled>Select Album</option>
            {albums.map((album) => (
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
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
};

export default ImageUpload;
