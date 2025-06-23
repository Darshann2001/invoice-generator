import React from 'react';
import styled from 'styled-components';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useCallback } from 'react';

const ToolbarWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-evenly;
  margin-bottom: 2rem;
  padding: 1rem
`;

const Button = styled.button`
  padding: 1rem 1.2rem;
  width: 15rem;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #4f46e5; /* Indigo */
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #4338ca;
    transform: translateY(-1px);
  }

  &:active {
    background: #3730a3;
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid #c7d2fe;
    outline-offset: 2px;
  }
`;



function Toolbar({ componentRef }) {
  const handlePrint = useCallback(
    useReactToPrint({
      content: () => componentRef.current,
      documentTitle: 'Invoice',
      removeAfterPrint: true,
    }),
    [componentRef]
  );

  const handleDownloadPdf = async () => {
    const canvas = await html2canvas(componentRef.current, { scale: 2 });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = pdfWidth * (canvas.height / canvas.width);
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
    pdf.save('invoice.pdf');
  };

  return (
    <ToolbarWrapper>
      <Button disabled onClick={handlePrint}>🖨️ Print</Button>
      <Button onClick={handleDownloadPdf}>📥 Download PDF</Button>
    </ToolbarWrapper>
  );
}

export default Toolbar;
