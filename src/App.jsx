  import React, { useState } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './app.css';
  import Navbar from './Common/Navbar/Navbar';
  import { DndProvider } from 'react-dnd';
  import { HTML5Backend } from 'react-dnd-html5-backend';
  import MyContext from './Common/MyContext/MyContext';

  function App() {
    const [PeriodicStatementvalue, setPeriodicStatementValue] = useState(null);
    const [Quotation, setQuotation] = useState(null);

    return (
      <MyContext.Provider value={{ PeriodicStatementvalue, Quotation, setQuotation, setPeriodicStatementValue }}>
        <DndProvider backend={HTML5Backend}>
          <Navbar />
        </DndProvider>
      </MyContext.Provider>
    );
  }

  export default App;
