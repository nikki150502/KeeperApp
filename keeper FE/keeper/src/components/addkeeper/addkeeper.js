import { useState } from 'react'
import './addkeeper.css'
 import React from 'react'
 import axios from 'axios'

const Addkeeper=({ setKeeperList})=>{

    const [keeper,setKeeper]=useState(
       { 
        title:'',
        description:""
    }
    )
    const handleChange=(e)=>{
        const {name,value }=e.target
    setKeeper({...keeper,[name]:value})
    }
    const add=()=>{
       if(keeper.title) 
       {
        // alert("Added")
        axios.post("http://localhost:8080/api/addnew",keeper)
        .then(res=>console.log(res.data))
        setKeeper({ 
            title:'',
            description:""
        })
       }
       else{
        // alert("please add title")
         
       }
       
    }

    return(
        <>
         <div className='addKeeper'>
            <input
            className='inputBox titleInput'
            type='text'
            name='title'
            autoComplete='off'
            onChange={handleChange}
            placeholder='Add Title'
            value={keeper.title}
            />
            <textarea
            className='inutBox description'
            name='description'
            onChange={handleChange}
            placeholder='Description'
            value={keeper.description}
            />

            <div className='addButton' onClick={add}>Add</div>
         </div>
        </>
    )
}
export default Addkeeper