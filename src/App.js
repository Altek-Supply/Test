import React, {useState} from 'react';
import PostForm from './components/PostForm';
import PasswordForm from "./components/PasswordForm"
import './App.css';


function App() {
  const hardcodedPassword = '1-780-465-9000';
  const [isPasswordCorrect, setIsPasswordCorrect] = useState('');

  const handlePasswordSubmit = (password) => {
    if (password === hardcodedPassword) {
      setIsPasswordCorrect(true);
    } else {
      console.log('Incorrect password! Please try again.');
    }
  }
  return (
    <div className="App">
         {!isPasswordCorrect ? (
        <PasswordForm onSubmit={handlePasswordSubmit} />
      ) : (
        <PostForm />
      )}
    </div>
  );
}

export default App;
