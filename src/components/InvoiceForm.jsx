// src/components/InvoiceForm.jsx
import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
  margin-bottom: 2rem;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 0.65rem 0.75rem;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border 0.2s ease;

  &:focus {
    border-color: #4f46e5;
  }
`;

const FullWidth = styled.div`
  grid-column: span 2;

  @media (max-width: 600px) {
    grid-column: span 1;
  }
`;

function InvoiceForm({ data, setData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <FormWrapper>
      <Field>
        <Label>Invoice Number</Label>
        <Input
          type="text"
          name="invoiceNo"
          value={data.invoiceNo}
          onChange={handleChange}
        />
      </Field>

      <Field>
        <Label>Invoice Date</Label>
        <Input
          type="date"
          name="date"
          value={data.date}
          onChange={handleChange}
        />
      </Field>

      <Field>
        <Label>Due Date</Label>
        <Input
          type="date"
          name="dueDate"
          value={data.dueDate}
          onChange={handleChange}
        />
      </Field>

      <Field>
        <Label>Tax Rate (%)</Label>
        <Input
          type="number"
          name="taxRate"
          value={data.taxRate}
          min="0"
          onChange={handleChange}
        />
      </Field>

      <FullWidth>
        <Field>
          <Label>Company Name & Address</Label>
          <Input
            type="text"
            name="company"
            placeholder="e.g. ABC Corp, 123 Street, NY"
            value={data.company}
            onChange={handleChange}
          />
        </Field>
      </FullWidth>

      <Field>
        <Label>Company Email</Label>
        <Input
          type="email"
          name="companyEmail"
          value={data.companyEmail}
          onChange={handleChange}
        />
      </Field>

      <Field>
        <Label>Company Phone</Label>
        <Input
          type="text"
          name="companyPhone"
          value={data.companyPhone}
          onChange={handleChange}
        />
      </Field>

      <FullWidth>
        <Field>
          <Label>Client Name & Address</Label>
          <Input
            type="text"
            name="client"
            placeholder="e.g. XYZ Pvt Ltd, 45 Avenue, CA"
            value={data.client}
            onChange={handleChange}
          />
        </Field>
      </FullWidth>

      <Field>
        <Label>Client VAT No.</Label>
        <Input
          type="text"
          name="clientVAT"
          value={data.clientVAT}
          onChange={handleChange}
        />
      </Field>

      <Field>
        <Label>Bank Name</Label>
        <Input
          type="text"
          name="bank"
          value={data.bank}
          onChange={handleChange}
        />
      </Field>

      <Field>
        <Label>IBAN</Label>
        <Input
          type="text"
          name="iban"
          value={data.iban}
          onChange={handleChange}
        />
      </Field>
    </FormWrapper>
  );
}

export default InvoiceForm;
