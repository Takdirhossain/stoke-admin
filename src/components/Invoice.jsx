// components/Invoice.js
import React, { forwardRef } from 'react';

const Invoice = forwardRef(({ sale }, ref) => {
  console.log(sale)
  if (!sale) return null;

  const {
    customer,
    customer_name,
    date,
    twelve_kg, empty_twelve_kg, price_12_kg,
    twentyfive_kg, empty_twentyfive_kg, price_25_kg,
    thirtythree_kg, empty_thirtythree_kg, price_33_kg,
    thirtyfive_kg, empty_thirtyfive_kg, price_35_kg,
    fourtyfive_kg, empty_fourtyfive_kg, price_45_kg,
    others_kg, empty_others_kg, price, pay, due
  } = sale;

  const formatCurrency = (value) => `${value || 0} TK`;

  return (
    <div ref={ref} className="invoice-container">
      <h1>Invoice</h1>

      <div className="invoice-header">
        <div>
          <strong>Customer:</strong> {customer?.name || customer_name}<br />
          <strong>Date:</strong> {date}
        </div>
        <div>
          <strong>Invoice ID:</strong> {sale.id}
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Filled / Empty</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {[
            { label: '12 KG', filled: twelve_kg, empty: empty_twelve_kg, price: price_12_kg },
            { label: '25 KG', filled: twentyfive_kg, empty: empty_twentyfive_kg, price: price_25_kg },
            { label: '33 KG', filled: thirtythree_kg, empty: empty_thirtythree_kg, price: price_33_kg },
            { label: '35 KG', filled: thirtyfive_kg, empty: empty_thirtyfive_kg, price: price_35_kg },
            { label: '45 KG', filled: fourtyfive_kg, empty: empty_fourtyfive_kg, price: price_45_kg },
            { label: 'Others', filled: others_kg, empty: empty_others_kg, price: 0 },
          ].map((item) => (
            <tr key={item.label}>
              <td>{item.label}</td>
              <td>{item.filled || 0} / {item.empty || 0}</td>
              <td>{formatCurrency(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-summary">
        <div><strong>Total Price:</strong> {formatCurrency(price)}</div>
        <div><strong>Pay:</strong> {formatCurrency(pay)}</div>
        <div><strong>Due:</strong> {formatCurrency(due)}</div>
      </div>

      <style>
        {`
          .invoice-container {
            width: 105mm; /* half A4 width */
            padding: 10mm;
            font-family: Arial, sans-serif;
            border: 1px solid #ddd;
            margin: 0 auto;
          }
          .invoice-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10mm;
          }
          .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10mm;
          }
          .invoice-table th, .invoice-table td {
            border: 1px solid #ddd;
            padding: 4px 6px;
            text-align: center;
          }
          .invoice-summary {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
          }
          @media print {
            body * {
              visibility: hidden;
            }
            .invoice-container, .invoice-container * {
              visibility: visible;
            }
            .invoice-container {
              margin: 0;
              padding: 0;
              border: none;
            }
          }
        `}
      </style>
    </div>
  );
});

export default Invoice;
