// src/components/InvoicePreview.jsx
import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  max-width: 850px;
  margin: auto;
  font-family: 'Inter', sans-serif;
  color: #333;
  font-size: 14px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  height: 120px;
  width: 150px;
  object-fit: contain;
`;

const CompanyInfo = styled.div`
  text-align: right;
  font-size: 12px;
`;

const InvoiceLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-top: 0.5rem;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Column = styled.div`
  font-size: 12px;
  line-height: 1.6;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #ccc;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-transform: capitalize;
`;

const TotalTable = styled.table`
  width: 100%;
  margin-top: 1rem;
`;

const TotalRow = styled.tr`
  font-weight: bold;
`;

const Notes = styled.div`
  margin-top: 2rem;
  font-size: 12px;
  color: #555;
`;

const Footer = styled.div`
  font-size: 11px;
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
`;



const InvoicePreview = forwardRef(({ invoiceDetails, items, logoUrl }, ref) => {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const discountRate = 5; // You can make this dynamic later
  const discountAmount = (subtotal * discountRate) / 100;
  const total = subtotal - discountAmount;

  return (
    <Card ref={ref}>
      <Header>
        <Logo
          src={logoUrl || "https://dummyimage.com/100x50/000/fff&text=LOGO"}
          alt="Company Logo"
        />
        <CompanyInfo>
          <div>{invoiceDetails.company}</div>
          <div>{invoiceDetails?.companyEmail || 'company@email.com'}</div>
          <div>{invoiceDetails?.companyPhone || '+91 999 999 9999'}</div>
          <InvoiceLabel>
            Invoice<br />
            <span style={{ fontSize: '12px', fontWeight: '400' }}>
              #{invoiceDetails.invoiceNo}<br />
              {invoiceDetails.date}
            </span>
          </InvoiceLabel>
        </CompanyInfo>
      </Header>

      <InfoSection>
        <Column>
          <strong>Recipient</strong><br />
          {invoiceDetails.client || 'Client Name'}<br />
        </Column>
        <Column>
          <strong>Invoice Date:</strong> {invoiceDetails.date}<br />
          <strong>Due Date:</strong>  {invoiceDetails.date}<br /> {/* optional due date here */}
        </Column>
      </InfoSection>

      <Table>
        <thead>
          <tr>
            <Th>Task Description</Th>
            <Th>Hours</Th>
            <Th>Rate</Th>
            <Th>Amount</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <Td>{item.description}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.unitPrice} INR</Td>
              <Td>{(item.quantity * item.unitPrice).toFixed(2)} INR</Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TotalTable>
        <tbody>
          <TotalRow>
            <Td colSpan="3">Subtotal</Td>
            <Td>{subtotal.toFixed(2)} INR</Td>
          </TotalRow>
          <TotalRow>
            <Td colSpan="3">Discount {discountRate}%</Td>
            <Td>{discountAmount.toFixed(2)} INR</Td>
          </TotalRow>
          <TotalRow>
            <Td colSpan="3">Total</Td>
            <Td style={{ color: '#1d4ed8' }}>{total.toFixed(2)} INR</Td>
          </TotalRow>
        </tbody>
      </TotalTable>

      <Notes>
        Transfer the amount to the business account below. Please include invoice number on your check.
        <br />
        BANK: {invoiceDetails.bank} &nbsp;&nbsp; IBAN: {invoiceDetails.iban}
      </Notes>

      <Footer>
        <div>
          {invoiceDetails.bank}<br />
          {invoiceDetails.iban}
        </div>
        <div>
          © {invoiceDetails.companyEmail}<br />
          {invoiceDetails.companyVAT}
        </div>
      </Footer>
    </Card>
  );
});

export default InvoicePreview;
