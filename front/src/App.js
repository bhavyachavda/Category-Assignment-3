import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Category from './pages/Category';
import ShowCategory from './pages/ShowCategory';


function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:9000/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    <div className="App">
     {/* <h1>{message}</h1> */}
     <BrowserRouter>
        <Routes>
        <Route exact path='/' element={< Category />}></Route>
        <Route exact path='/category' element={< ShowCategory />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
