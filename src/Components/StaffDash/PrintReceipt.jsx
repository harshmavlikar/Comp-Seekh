import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './PrintReceipt.css';
import logo from '../../assets/CSlogo1.png';

function PrintReceipt() {
  const { receiptId } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [fees, setFees] = useState(null);
  const [balance, setBalance] = useState(null);
  const receiptRef = useRef(); // Reference to the receipt section

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const receiptResponse = await fetch(`https://localhost:7158/api/Receipts/${receiptId}`);
        const receiptData = await receiptResponse.json();
        setReceipt(receiptData);

        const paymentResponse = await fetch(`https://localhost:7158/api/Payments/${receiptData.paymentId}`);
        const paymentData = await paymentResponse.json();
        const batchId = paymentData.batchId;

        if (batchId) {
          const feesResponse = await fetch(`https://localhost:7158/api/Batch/getFeesByBatchId/${batchId}`);
          const feesData = await feesResponse.json();

          const totalFees = parseFloat(feesData);

          if (!isNaN(totalFees)) {
            const paidAmount = parseFloat(receiptData.receiptAmount);
            const remainingBalance = totalFees - paidAmount;
            setBalance(remainingBalance > 0 ? remainingBalance : 0);
            setFees(totalFees);
          }
        }
      } catch (error) {
        console.error('Error fetching receipt or payment:', error);
      }
    };

    fetchReceipt();
  }, [receiptId]);

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to restore original content
  };

  return (
    <div className="print-receipt-container"><br /><br /><br />
      {receipt ? (
        <div className="receipt" ref={receiptRef}>
          <div className="header">
            <img src={logo} alt="Company Logo" className="logo-large" />
            <hr />
          </div>

          <h2 className="receipt-title">Receipt</h2>

          <table className="receipt-table">
            <tbody>
              <tr>
                <td><strong>Date:</strong></td>
                <td>{receipt.receiptDate}</td>
              </tr>
              <tr>
                <td><strong>Receipt ID:</strong></td>
                <td>{receipt.receiptId}</td>
              </tr>
              <tr>
                <td><strong>Payment ID:</strong></td>
                <td>{receipt.paymentId}</td>
              </tr>
              <tr>
                <td><strong>Total Fees:</strong></td>
                <td>₹{fees}</td>
              </tr>
              <tr>
                <td><strong>Amount Paid:</strong></td>
                <td>₹{receipt.receiptAmount}</td>
              </tr>
              
              <tr>
                <td><strong>Remaining Balance:</strong></td>
                <td>₹{balance}</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <div className="footer">
            <p>Thank you for your payment!</p>
            <h3>ComputerSeekho Institute</h3>
            <p>123 Main Street, City, Country</p>
            <p>Phone: +123 456 7890 | Email: info@vidyanidhi.com</p>
            <button className="print-button" onClick={handlePrint}>Print Receipt</button>
          </div>
        </div>
      ) : (
        <p>Loading receipt...</p>
      )}
    </div>
  );
}

export default PrintReceipt;
