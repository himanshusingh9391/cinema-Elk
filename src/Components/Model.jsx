import React from 'react';
import { Button } from "react-bootstrap";
import { useState } from "react";
import {db} from '../Firebase';
import {collection, addDoc} from 'firebase/firestore';



const Handlepost = ({Close})=>{
    const [comment,setComment] = useState();
    const [data,setData] = useState();
    const [names,setNames]= useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const qry = await addDoc(collection(db,"overview"),{
            
            ratings:comment,
            review:data,
            user:names,
        });
        setComment(' ');
        setNames(' ');
        setData(' ');
    }

   

    return(
        <>
            <div className='mod' onClick={Close}></div>
            
            <div className="conatiner" >
            <form onSubmit={handleSubmit}>
                <h4 style={{marginTop:'-1rem'}}>Enter Your Review Here</h4>
                <input onChange={(e)=>setNames(e.currentTarget.value)} placeholder='Enter your name' type='text' style={{border:'none',borderBottom:'1.2px solid grey',outline:'none'}}/>
                <input onChange={(e)=>setComment(e.currentTarget.value)} placeholder='Enter your review' type="text"  style={{width:'15rem',marginTop:'-1rem',border:'none',outline:'none',borderBottom:'1.2px solid gray'}}  />
                <div style={{marginTop:'1rem'}}>
                    Rate <input type="text" className="module" onChange={(e)=>setData(e.currentTarget.value)}/> Out of 5
                </div>
                <div className="bot">
                    <Button type='submit'>Submit</Button>
                    <Button  onClick={Close}>Close</Button>
                </div>
                </form>
            </div>
           
            
        
        </>
    )
 }

 export default Handlepost;