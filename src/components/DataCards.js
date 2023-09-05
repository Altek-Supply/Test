import React, { useState, useEffect } from 'react';
import ImportFile from './ImportFile';

// Component for an individual data card
const DataCard = ({item, selectedItem, onItemClick }) => {
  return (
    <div
      className={`data-card ${selectedItem === item ? 'selected' : ''}`}
      onClick={() => onItemClick(item)}
    >
      <p>{item[0]}</p> {/* Display the first property of the item object. */}
      <p>{item[1]}</p> {/* Display the second property of the item object. */}
    </div>
  );
};

// Component for a box containing data cards
const DataBox = ({ name, responseData, onItemClick, boxIndex, manualInput, onManualInputChange }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [alternateSAP, setAlternateSAP] = useState('');
  const [alternateProductDescription, setAlternateProductDescription] = useState('');


  useEffect(() => {
    if (responseData) {
      setOptions(responseData); // Assign responseData directly to options
    }
  }, [responseData]);

  // Function to handle user selections in DataCard component
  const handleItemClick = (item) => {
    console.log('Clicked on item:', item[0], item[1], 'in', name);
    setSelectedItem(item);
    onItemClick(item, name, boxIndex);
  };

  const handleFormReset = () => {
    setSelectedItem(null); // Reset the selected item
    onManualInputChange('SAP', ''); // Clear manualInput.SAP
    onManualInputChange('ProductDescription', ''); // Clear manualInput.ProductDescription
    onManualInputChange('AlternateSAP',''); // Reset alternateSAP
    onManualInputChange('AlternateProductDescription',''); // Reset alternateProductDescription
    setAlternateSAP(''); // Reset alternateSAP
    setAlternateProductDescription(''); // Reset alternateProductDescription
    onItemClick(null, name, boxIndex); // Pass null as the selectedItem
  };

  // Function to handle manual input change for "Alternate SAP Item Number" and "Alternate Product Description"
  const handleManualInputChange = (inputType, value) => {
    onManualInputChange(inputType, value);
    if (inputType === 'AlternateSAP') {
      setAlternateSAP(value); // Update alternateSAP state
    } else if (inputType === 'AlternateProductDescription') {
      setAlternateProductDescription(value); // Update alternateProductDescription state
    } 
  };
  
  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="box">
      <h2>{name}</h2>
       
      <div className="button-container">
        <button onClick={handleToggleShowAll}>{showAll ? '-' : '+'}</button>
      </div>
      <div className="data-cards">
        {showAll          
          ? options.map((item, index) => (
              <DataCard
                key={index}
                item={item}
                selectedItem={selectedItem}
                onItemClick={handleItemClick}
                showAll={showAll}
              />
            ))
          : options.slice(0, 2).map((item, index) => (
              <DataCard
                key={index}
                item={item}
                selectedItem={selectedItem}
                onItemClick={handleItemClick}
                showAll={showAll}
              />
            ))}
      </div>
      {/* Conditionally render the manual input fields */}
        {showAll && (
          <>
            <br/>
            <p><b>Please enter the matching SKU if you do not see the matching SKU in suggestions, your feedback will help us improve our matching accuracy.</b></p>
            <br/>
            <input
              type="text"
              value={(typeof manualInput === 'object' && manualInput.SAP) || ''}
              onChange={(e) => handleManualInputChange('SAP', e.target.value)}
              placeholder="Enter SAP Item Number..."
            />
            <input
              type="text"
              value={(typeof manualInput === 'object' && manualInput.ProductDescription) || ''}
              onChange={(e) => handleManualInputChange('ProductDescription', e.target.value)}
              placeholder="Enter Product Description..."
            />
            <br/>
            <p><b>Please enter alternate SKU.</b></p>
            <br/>
            <input
              type="text"
              value={alternateSAP}
              onChange={(e) => {
                setAlternateSAP(e.target.value);
                handleManualInputChange('AlternateSAP', e.target.value); // Update manualInputs
              }}
              placeholder="Enter Alternate SAP..."
            />
            <input
              type="text"
              value={alternateProductDescription}
              onChange={(e) => {
                setAlternateProductDescription(e.target.value);
                handleManualInputChange('AlternateProductDescription', e.target.value); // Update manualInputs
              }}
              placeholder="Enter Alternate Product Description..."
            />
          </>
        )}
      <div className="button-container">
        <button onClick={handleFormReset}>Reset</button>
      </div>
    </div>
  );
};

// Top-level component for displaying multiple data boxes
const DataCards = ({ responseData }) => {

  const [selectedData, setSelectedData] = useState([]);
  const [manualInputs, setManualInputs] = useState({});

  const handleItemClick = (item, name, boxIndex) => {
    setSelectedData((prevSelectedData) => {
      const updatedData = [...prevSelectedData];
      updatedData[boxIndex] = { item, name };
      return updatedData;
    });
  };

  const handleManualInput = (name, field, input) => {
    // Find the index of the data box in manualInputs array
    const boxIndex = selectedData.findIndex((data) => data.name === name);
  
    // If the data box exists in selectedData, update its manual inputs
    if (boxIndex !== -1) {
      setSelectedData((prevSelectedData) => {
        const updatedData = [...prevSelectedData];
        updatedData[boxIndex] = {
          ...updatedData[boxIndex],
          manualInput: {
            ...updatedData[boxIndex].manualInput,
            [field]: input,
          },
        };
        return updatedData;
      });
    } else {
      // If the data box doesn't exist in selectedData, create a new entry
      setSelectedData((prevSelectedData) => [
        ...prevSelectedData,
        { name, item: null, manualInput: { [field]: input } },
      ]);
    }
  
    setManualInputs((prevInputs) => ({
      ...prevInputs,
      [name]: {
        ...prevInputs[name],
        [field]: input,
      },
    }));
  };
  //console.log('Selected Data:', selectedData);
  const dataEntries = Object.entries(responseData);

  return (
    <div className="boxes">
      {dataEntries.map(([name, dataItems], index) => (
       <DataBox
        key={name}
        name={name}
        responseData={dataItems}
        onItemClick={(item, name) => handleItemClick(item, name, index)}
        item={selectedData.find((data) => data.name === name)?.item} // Pass the selected item for each databox
        manualInput={selectedData.find((data) => data.name === name)?.manualInput} // Pass manual input for each databox
        onManualInputChange={(field, input) => handleManualInput(name, field, input)} // Handle manual input change
        alternateSAP={manualInputs[name]?.AlternateSAP || ''}  // Use "AlternateSAP"
        alternateProductDescription={manualInputs[name]?.AlternateProductDescription || ''}  // Use "AlternateProductDescription"
     />
      ))}
      {/* Render the ImportFile component and pass the selectedData */}
      <ImportFile selectedData={selectedData} manualInputs={manualInputs} />
    </div>
  );
};

export default DataCards;