import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Map from './map.jsx';
import './Contact.css'; // Import the CSS file

function Contact() {
  const [result, setResult] = useState("");

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setResult("Sending....");
    const formData = new FormData(e.target);

    formData.append("access_key", "c8508f03-1897-4f7b-933a-920e2ea9e293"); // Replace with your Web3Forms access key

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        e.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResult('Submission failed. Please try again.');
    }
  };

  return (
    <Container>
      <div className="contact-container">
        <div className="contact-form">
          <Form onSubmit={handleEnquirySubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              required
            />

            <label>Mobile:</label>
            <input
              type="text"
              name="mobile"
              required
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              required
            />

            <label>Query:</label>
            <textarea
              name="message"
              rows="3"
              required
            />

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <span>{result}</span>
        </div>

        <div className="map-container">
          <Map />
        </div>
      </div>
    </Container>
  );
}

export default Contact;
