import axios from 'axios'
import React, { useEffect, useState } from 'react'

function FetchData() {
    const[records, setRecords] = useState([])
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {setRecords(res.data)})
        .catch(err => console.log(err))
    },[])
  return (
    <div className="output">
        <select>
            {records.map(item => 
            (
                <option key={item.id} value={item.id}>
                    {item.id}     {item.name}
                </option>
            ))} 
        </select>
    </div>
  )
}

export default FetchData