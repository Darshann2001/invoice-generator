// src/components/LineItems.jsx
import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  background: #f0f0f0;
`;

const Td = styled.td`
  padding: 0.5rem;
  border-top: 1px solid #ccc;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.3rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.3rem 0.6rem;
  margin-top: 0.5rem;
  cursor: pointer;
`;

function LineItems({ items, setItems }) {
  const handleChange = (index, field, value) => {
    const newItems = [...items];
    if (field === 'quantity' || field === 'unitPrice') {
      value = parseFloat(value) || 0;
    }
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th>Description</Th>
            <Th>Quantity</Th>
            <Th>Unit Price</Th>
            <Th>Total</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <Td>
                <Input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    handleChange(index, 'description', e.target.value)
                  }
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleChange(index, 'quantity', e.target.value)
                  }
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleChange(index, 'unitPrice', e.target.value)
                  }
                />
              </Td>
              <Td>{(item.quantity * item.unitPrice).toFixed(2)}</Td>
              <Td>
                <Button onClick={() => removeItem(index)}>❌</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={addItem}>➕ Add Item</Button>
    </>
  );
}

export default LineItems;
