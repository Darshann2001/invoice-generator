import { useState, useRef } from 'react';
import InvoiceForm from './components/InvoiceForm.jsx';
import LineItems from './components/LineItems.jsx';
import InvoicePreview from './components/InvoicePreview.jsx';
import Toolbar from './components/Toolbar.jsx';
import styled from 'styled-components';

function App() {
  // Add this above your component
  const UploadContainer = styled.div`
  background: #f9fafb;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

  const UploadLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
`;

  const FileInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background-color: #fff;
  cursor: pointer;
`;

  const LogoPreview = styled.img`
  max-height: 50px;
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 4px;
  background: #fff;
`;



  const [logoUrl, setLogoUrl] = useState(null);

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNo: '',
    date: '',
    dueDate: '',
    company: '',
    companyEmail: '',
    companyPhone: '',
    client: '',
    clientAddress: '',
    clientVAT: '',
    bank: '',
    iban: '',
  });

  const [items, setItems] = useState([
    { description: '', quantity: 1, unitPrice: 0 }
  ]);

  const componentRef = useRef();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div className="App" style={{ padding: '1rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>Invoice Generator</h1>
      <UploadContainer>
        <div style={{ flex: 1 }}>
          <UploadLabel htmlFor="logo-upload">Upload Company Logo</UploadLabel><br />
          <FileInput
            type="file"
            id="logo-upload"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </div>
        {logoUrl && (
          <LogoPreview src={logoUrl} alt="Logo Preview" />
        )}
      </UploadContainer>

      <InvoiceForm data={invoiceDetails} setData={setInvoiceDetails} />
      <LineItems items={items} setItems={setItems} />
      <InvoicePreview
        ref={componentRef}
        invoiceDetails={invoiceDetails}
        items={items}
        logoUrl={logoUrl}
      />
      <Toolbar componentRef={componentRef} />
    </div>
  );
}

export default App;
