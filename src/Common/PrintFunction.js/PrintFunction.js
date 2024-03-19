export const PrintFunction = (targetId) => {
  const element = document.getElementById(targetId);

  if (element) {
    const printWindow = window.open('', '_blank');

    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(`
    <style>
      @media print {
        .print-table {
          border-collapse: collapse;
          width: 100%;
        }
        .print-table th, .print-table td {
          border: 1px solid black;
          padding: 15px;
          text-align: center;
        }
        .trans-inp-par{
          display:flex;
          justify-content:space-between;
          flex-wrap:wrap;
          gap:20px;
        }
        .FormTextBox-semicolon{
          visibility : hidden;
        }
        .FormTextBox-Name-division {
          width: 50%;
          display: flex;
          justify-content: space-between;
        }
        .FormTextBox-Main-division {
          max-width: 500px;
          display: flex;
          justify-content: space-between;
        }
        .transaction-with-icons{
          display : none;
        }
        }
    </style>
  `);

    // Clone the content of the target element
    const clonedContent = element.cloneNode(true);
    printWindow.document.body.appendChild(clonedContent);

    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // Delay the print trigger to ensure content is loaded
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000); // You can adjust the delay time if needed
  } else {
    console.error(`Element with id ${targetId} not found`);
  }
};
