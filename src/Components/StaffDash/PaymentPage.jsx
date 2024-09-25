import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

function PaymentPage() {
  const { batchId, studentMobile } = useParams();
  const navigate = useNavigate();
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [amount, setAmount] = useState('');
  const [fees, setFees] = useState(null);
  const [student, setStudent] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [courseId, setCourseId] = useState(null); // New state for courseId
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [receipt, setReceipt] = useState(null); 

  useEffect(() => {
    // Fetch payment types
    const fetchPaymentTypes = async () => {
      try {
        const response = await fetch('https://localhost:7158/api/PaymentTypes');
        const data = await response.json();
        setPaymentTypes(data);
      } catch (error) {
        console.error('Error fetching payment types:', error);
      }
    };

    // Fetch fees for the selected batch
    const fetchFees = async () => {
      try {
        const response = await fetch(`https://localhost:7158/api/Batch/getFeesByBatchId/${batchId}`);
        const data = await response.json();
        console.log('Fees data:', data.fees); // Check the structure of the response
        setFees(data); // Ensure this is the correct field
      } catch (error) {
        console.error('Error fetching fees:', error);
      }
    };

    // Fetch student details
    const fetchStudent = async () => {
      try {
        const response = await fetch(`https://localhost:7158/api/Students/getByMobile/${studentMobile}`);
        const data = await response.json();
        console.log('Student data:', data); // Check the student data
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchPaymentTypes();
    fetchFees();
    fetchStudent();
  }, [batchId, studentMobile]);

  const handlePayment = async () => {
    if (amount <= 0 || !selectedPaymentType) {
      alert('Please enter a valid amount and select a payment type.');
      return;
    }

    const paymentPayload = {
        studentId: student.studentId,
      batchId: batchId,
      amount: parseFloat(amount),
      courseId: student.courseId,
      paymentTypeId: selectedPaymentType,
      paymentDate
    };

    try {
        console.log(paymentPayload);
      const response = await fetch('https://localhost:7158/api/Payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentPayload)
      });

      if (response.ok) {
        const paymentData = await response.json();
        
        // Create receipt
        const receiptPayload = {
          receiptDate: new Date().toISOString().split('T')[0],
          receiptAmount: parseFloat(amount),
          paymentId: paymentData.paymentId
        };

        const receiptResponse = await fetch('https://localhost:7158/api/Receipts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(receiptPayload)
        });

        if (receiptResponse.ok) {
          const receiptData = await receiptResponse.json();
          setReceipt(receiptData);
          // Navigate to the printable receipt page
          navigate(`/print-receipt/${receiptData.receiptId}`);
        } else {
          console.error('Error processing receipt');
        }
      } else {
        console.error('Error processing payment');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="payment-page-container"><br /><br />
      <h1>Payment Page</h1>
      {fees !== null ? (
        <div className="payment-form">
          <div className="fees-display">
            <h2>Fees for the Selected Batch: ₹{fees}</h2>
          </div>
          <label>
            Amount: 
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              min="0"
              placeholder="Enter amount"
            />
          </label>
          <label>
            Payment Type: 
            <select onChange={(e) => setSelectedPaymentType(e.target.value)} value={selectedPaymentType}>
              <option value="" disabled>Select Payment Type</option>
              {paymentTypes.map((type) => (
                <option key={type.paymentTypeId} value={type.paymentTypeId}>
                  {type.paymentTypeDesc}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={handlePayment}>Pay NOW</button>
        </div>
      ) : (
        <p>Loading fees...</p>
      )}
      {receipt && (
        <div className="receipt-info">
          <h3>Fees Receipt</h3>
          <p><strong>Receipt ID:</strong> {receipt.receiptId}</p>
          <p><strong>Receipt Date:</strong> {receipt.receiptDate}</p>
          <p><strong>Amount:</strong> ₹{receipt.receiptAmount}</p>
          <p><strong>Payment ID:</strong> {receipt.paymentId}</p>
          <button onClick={() => window.print()}>Print Receipt</button>
        </div>
      )}    
    </div>
  );
}

export default PaymentPage;
