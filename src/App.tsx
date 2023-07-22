import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Select} from './Select';

function App() {
    const [value,setValue]=useState(' ')
    const item=[
        {value: '1', title: 'Minsk'},
        {value: '2', title: 'Moscow'},
        {value: '3', title: 'Kiev'},
        {value: '4', title: 'Milan'},
        {value: '5', title: 'Paris'},
    ]

    const onChangeHandler=(value:string)=>{
        setValue(value)
    }
  return (

    <div className="App">

      <Select item={item} value={value} onChange={(value)=>{onChangeHandler(value)}}/>
    </div>
  );
}

export default App;
