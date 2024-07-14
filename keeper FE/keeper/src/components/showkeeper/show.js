 
 import './show.css'
 import { useState, useEffect } from 'react';
 import axios from 'axios';
 
 const Show = () => {
   const [keeperList, setKeeperList] = useState([]);
 
   useEffect(() => {
     fetchKeepers();
   }, []);
 
   const fetchKeepers = () => {
     axios.get("http://localhost:8080/api/getall")
       .then(res => setKeeperList(res.data))
       .catch(err => console.error("Error fetching keepers:", err));
   };
 
   const deleteKeeper = (id) => {
     axios.delete("http://localhost:8080/api/delete", { data: { id } })
       .then(res => setKeeperList(res.data))
       .catch(err => console.error("Error deleting keeper:", err));
   };
 
   return (
     <div className="showKeeper row">
       {
         keeperList.map(keeper => (
           <div className="keeperCard col-md-3" key={keeper._id}>
             <h1 className="title">
               {keeper.title} 
               <i className="deleteIcon fa fa-trash" aria-hidden="true"
                  onClick={() => deleteKeeper(keeper._id)}>
               </i>
             </h1>
             <textarea 
               className="descriptionBox" 
               value={keeper.description} 
               readOnly />
           </div>
         ))
       }
     </div>
   );
 };
 
 export default Show;
 