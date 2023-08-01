import React, {useState} from 'react';
import logoImage from '../logo.png';
import '../PasswordForm.css'; // Import your custom styling from app.css


function PasswordForm({ onSubmit }) {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange=(e)=>
    {
        setPassword(e.target.value);
    };

    const handleSubmit=(e)=>
    {
        e.preventDefault();
    if (password === '') {
      setErrorMessage('Please enter password.');
    } 
    else if (password !== '1-780-465-9000') {
        setErrorMessage('Wrong password entered. Please try again.');
      }
      else {
      setErrorMessage('');
      onSubmit(password);
    }
    };

  return (
    <div className="passwordform-container">
            
            <img src={logoImage} alt="Logo" className="logo-image" />
            <h1>Atlas Smart Search</h1>

            {errorMessage && <p>{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <input type="password" value={password} onChange={handleChange} />
                </div>
                <div className="button-container">
                <button type="submit" > Submit </button>
                </div>
            </form>
    </div>
  )
}

export default PasswordForm;