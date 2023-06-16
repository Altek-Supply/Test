import React, { useState } from 'react';
import DataCards from './DataCards';
import Loading from './Loading';
import logoImage from '../logo.png';
import '../Loading.css';


function PostForm() {
  const endpointUrl = 'http://smartsearch.e4968d402781421d8c72.westus2.aksapp.io/api/smartsearch'; // Endpoint URL
  const [loading, setLoading] = useState(false); // Defining loading state as false on initialization
  const [data, setData] = useState({
    names: []
  });
  const [responseData, setResponseData] = useState(null);

  function submit(e) {
    e.preventDefault();
    setLoading(true); // Defining the loading state as true as API is fetching response
    const searchString = encodeURIComponent(data.names.join('*'));

    const fullUrl = `${endpointUrl}?txt="${searchString}"`; //URL Reconstruction

    fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponseData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setResponseData(null);
        setLoading(false); // Setting the loading state to false once response is recieved 
      });
  }

  function handle(e) {
    const inputValue = e.target.value;
    const inputArray = inputValue.split('*');
    setData({ names: inputArray });
    console.log(inputArray);
  }

  return (
    <div id="Forms" className="forms">
      <div className="container">
      <div className="logo-container">
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>
        <form onSubmit={submit}>
          <div className="form_box">
            <div className="row">
              <h1>Atlas smart search</h1>
              <textarea
                onChange={handle}
                className="sku_textarea"
                value={data.names.join('*')}
                placeholder="PASTE END USER DESCRIPTION AS PROMPT"
                type="text"
              ></textarea>
            </div>
          </div>
          <button className="btn-submit">Submit</button>
        </form>

        <div className="output_box">
            {loading && <Loading />}
            {!loading && responseData && 
            (<DataCards names={data.names} responseData={responseData} /> 
            )} 
        </div>
      </div>
    </div>
  );
}

export default PostForm;