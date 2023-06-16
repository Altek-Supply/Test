import React, { useState, useEffect } from 'react';

// Component for an individual data card
const DataCard = ({ item, selectedItem, onItemClick }) => {
  return (
    <div
      className={`data-card ${selectedItem === item ? 'selected' : ''}`}
      onClick={() => onItemClick(item)}
    >
      <p>{item[0]}</p> {/* Display the first property of the item object */}
      <p>{item[1]}</p> {/* Display the second property of the item object */}
    </div>
  );
};

// Component for a box containing data cards
const DataBox = ({ name, responseData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (responseData) {
      setOptions(responseData); // Assign responseData directly to options
    }
  }, [responseData]);

  // Handle click on a data card
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleFormSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="box">
      <h2>{name}</h2>
      <div className="data-cards">
        {options.map((item, index) => (
          <DataCard
            key={index}
            item={item}
            selectedItem={selectedItem}
            onItemClick={handleItemClick}
          />
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleFormSubmit}>Submit</button>
        <button>Revert</button>
      </div>
      {submitted && <p>Thank you for your submission.</p>}
    </div>
  );
};

// Top-level component for displaying multiple data boxes
const DataCards = ({ names, responseData }) => {
  return (
    <div className="boxes">
      {names.map((name, index) => (
        <DataBox key={index} name={name} responseData={responseData} />
      ))}
    </div>
  );
};

export default DataCards;