import React, { useState , useEffect} from 'react';
import DataCards from './DataCards';
import Loading from './Loading';
import logoImage from '../logo.png';
import {v4 as uuidv4} from 'uuid';
import InstructionsModal from './InstructionsModal';
import '../Loading.css';

    // Function to split an array into chunks of a specified size
    function chunkArray(array, size) {
      const chunks = [];
      for (let i = 0; i < array.length; i += size) { // Array.length comes from number of user descriptions i.e data.names
        chunks.push(array.slice(i, i + size)); /*In case of 100 descriptions/data.names 6 chunks created as multiples of 15, remaining 10 will be stored as final chunk cause .slice built in function handles out of bound array exception*/
      }
      return chunks; 
    }

function PostForm() {
  const sessionID = localStorage.getItem('sessionID') || uuidv4();
  const endpointUrl = 'https://20.230.148.143/api/smartsearch'; // Endpoint URL
  const [loading, setLoading] = useState(false); // Defining loading state as false on initialization
  const [data, setData] = useState({
    names: []
  });
  const [responseData, setResponseData] = useState(null);

  //localStorage.getItem('sessionID', sessionID);

  useEffect(()=>{
    localStorage.setItem('sessionID',sessionID)
    console.log('Session ID:', sessionID);
  },[sessionID])

  function submit(e) {
    e.preventDefault();
  setLoading(true);
  const searchChunks = chunkArray(data.names, 15); // Split data.names into chunks of 15 using chunkArray function  

  const requests = searchChunks.map((chunk) => {
    const searchString = encodeURIComponent(chunk.join('*'));
    const chunkUrl = `${endpointUrl}?sessionID=${sessionID}&txt=${searchString}`;

    return fetch(chunkUrl)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        return null;
      });
  });

// Function to merge individual response objects into a single object
function mergeResponses(responses) {
  const mergedData = {};

  responses.forEach((response) => {
    Object.entries(response).forEach(([searchDescription, items]) => {
      if (!mergedData[searchDescription]) {
        mergedData[searchDescription] = items;
      } else {
        mergedData[searchDescription].push(...items);
      }
    });
  });
  return mergedData;
}

  Promise.all(requests) //Promises are asynchronous and wait for all request call to be answered, in our case of 100 descriptions the requests/endpoint calls would be 7.
    .then((responses) => {
      const mergedData = mergeResponses(responses); // Merge the individual responses
      console.log(mergedData);
      setResponseData(mergedData);
      setLoading(false);
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

        <InstructionsModal />     

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