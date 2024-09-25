import React, { useState, useEffect } from 'react';
import './Placements.css';

const Placements = () => {
  const [images, setImages] = useState([]); // State to store the images
  const [visibleRows, setVisibleRows] = useState([]); // State to store visible rows
  const [showAll, setShowAll] = useState(false); // State to toggle between showing all rows or just the initial rows
  const [selectedBatch, setSelectedBatch] = useState(''); // State to store selected batch
  const [batches, setBatches] = useState([]); // State to store batch options

  const rowsPerPage = 3; // Number of rows to display initially
  const imagesPerRow = 4; // Number of images per row

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const albumId = 2; // Specify the album ID you want to filter by
        const response = await fetch(`https://localhost:7158/api/Images`, {
          method: 'GET',
          credentials: 'include', // Include credentials such as cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setImages(data);

          // Organize images into rows
          const rows = [];
          for (let i = 0; i < data.length; i += imagesPerRow) {
            rows.push(data.slice(i, i + imagesPerRow));
          }
          setVisibleRows(rows.slice(0, rowsPerPage)); // Initially show only the first few rows
        } else {
          console.error('Error fetching images:', response.status);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    // Fetch batches or filter by batch as needed
    // This example assumes a batch API endpoint
    const fetchBatches = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/batch`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBatches(data);
        } else {
          console.error('Error fetching batches:', response.status);
        }
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };

    fetchBatches();
  }, []);

  const handleShowMore = () => {
    setShowAll(true);
    setVisibleRows(
      images.reduce((rows, image, index) => {
        const rowIndex = Math.floor(index / imagesPerRow);
        if (!rows[rowIndex]) rows[rowIndex] = [];
        rows[rowIndex].push(image);
        return rows;
      }, [])
    );
  };

  const handleBatchChange = async (event) => {
    const batchId = event.target.value;
    setSelectedBatch(batchId);

    // Fetch images based on selected batch
    try {
      const response = await fetch(`http://localhost:8080/api/imagesByBatch/${batchId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setImages(data);

        // Organize images into rows
        const rows = [];
        for (let i = 0; i < data.length; i += imagesPerRow) {
          rows.push(data.slice(i, i + imagesPerRow));
        }
        setVisibleRows(rows.slice(0, rowsPerPage)); // Initially show only the first few rows
      } else {
        console.error('Error fetching images:', response.status);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Placements</h1>
      <section id="placements" className="placements">
        <div className="placements-header">
          <img src="./job.jpg" alt="Placements" className="placements-image" />
        </div>
      </section>
      <h1 style={{ textAlign: 'center' }}>Major Recruiters</h1>
      <div className="logos-container">
        {visibleRows.map((row, rowIndex) => (
          <div className="image-row" key={rowIndex}>
            {row.map((image) => (
              <img
                className="image"
                key={image.image_id}
                src={`/${image.imagePath}`}
                alt={`Image ${image.image_id}`}
              />
            ))}
          </div>
        ))}
      </div>
      {!showAll && images.length > rowsPerPage * imagesPerRow && (
        <div className="show-more-container">
          <button onClick={handleShowMore} className="show-more-button">
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Placements;
