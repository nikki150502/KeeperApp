 
import './App.css';
import Error from './components/error/error.js'
import Header from './components/header/header.js'
import Show from './components/showkeeper/show.js'
import Addkeeper from './components/addkeeper/addkeeper.js';
import axios from 'axios'

// import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useEffect, useState } from 'react';

function App() {
  const [keeperList,setKeeperList]=useState([])
 
  useEffect(()=>{
axios.get("http://localhost:8080/api/getall")
.then(res=>setKeeperList(res.data))
},[])
  
  return (
    <>
    <Header />
    <Addkeeper keeperList={keeperList}  setKeeperList={setKeeperList}/>
    {/* <Error /> */}
    <Show keeperList={keeperList} setKeeperList={setKeeperList}/>
   
    </>
  );
}

export default App;
