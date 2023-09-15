import React, { useState } from "react";
import "./App.css";
import InvoiceForm from "./InvoiceForm";

export const myContext = React.createContext();
function App() {
  const [currency, setCurrency] = React.useState("INR");
  const [tax, setTax] = React.useState(0);

  return (
    <div className="App">
      <h1>Invoice Generator</h1>

      <myContext.Provider value={{ myCurrency: currency, myTax: tax }}>
        <InvoiceForm />
      </myContext.Provider>
    </div>
  );
}

export default App;
