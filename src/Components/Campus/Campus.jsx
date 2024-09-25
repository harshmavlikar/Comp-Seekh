import React, { useState } from 'react';
import './Campus.css';
import gallery_1 from '../../assets/gallery-1.png';
import gallery_2 from '../../assets/gallery-2.png';
import gallery_3 from '../../assets/gallery-3.png';
import gallery_4 from '../../assets/gallery-4.png';
import white_arrow from '../../assets/white-arrow.png';

const Campus = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='campus'>
      <div className="gallery">
        <img src={gallery_1} alt="Gallery 1" />
        <img src={gallery_2} alt="Gallery 2" />
        <img src={gallery_3} alt="Gallery 3" />
        <img src={gallery_4} alt="Gallery 4" />
      </div>
      <div className="btn-container">
        <button className='btn dark-btn' onClick={handleShowModal}>
          See More Here <img src={white_arrow} alt='Arrow' />
        </button>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>X</button>
            <div className="modal-sections">
              <div className="modal-section">
                <img src={gallery_1} alt="Computer Lab" />
                <div className="modal-text">
                  <h3>Fully Functional Computer Lab</h3>
                  <p>Our computer lab is equipped with the latest technology and high-speed internet, ensuring that students have access to modern resources for their learning and development.</p>
                </div>
              </div>
              <div className="modal-section">
                <img src={gallery_2} alt="Classroom" />
                <div className="modal-text">
                  <h3>Modern Classrooms</h3>
                  <p>Our classrooms are designed to facilitate interactive learning with comfortable seating, multimedia projectors, and a conducive environment for effective teaching.</p>
                </div>
              </div>
              <div className="modal-section">
                <img src={gallery_3} alt="Library" />
                <div className="modal-text">
                  <h3>Extensive Library</h3>
                  <p>Our library offers a vast collection of books, journals, and online resources, providing students with comprehensive material to support their academic and personal growth.</p>
                </div>
              </div>
              <div className="modal-section">
                <img src={gallery_4} alt="Campus Environment" />
                <div className="modal-text">
                  <h3>Vibrant Campus Environment</h3>
                  <p>The campus is a lively place with various activities and events. From cultural celebrations to academic workshops, students are encouraged to participate and make the most of their college experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Campus;
