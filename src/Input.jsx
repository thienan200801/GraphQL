import {useState} from 'react';
import "./App.css";

function Input(){
    const [input, setInput] = useState('');
    return (
      <div className="App">
        <input type="text" value="input" />
      </div>
    )
  }

export default Input;