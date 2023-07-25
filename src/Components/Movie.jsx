import React,{useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import {Menu,Button} from 'antd';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import {db} from '../Firebase';
import {collection, onSnapshot,query} from 'firebase/firestore';

export default function Movie() {
    const [notes, setnotes] = useState([]);
    const navigate = useNavigate();

    const fetchAllNotes = async () =>{
      try{
        const qry = await query(collection(db,'overview'));

        await onSnapshot(qry, (querySnapshot)=>{
          setnotes(querySnapshot.docs.map((doc)=>({
            id: doc.id,
            data: doc.data(),
          }))
          )
        })
      } catch(error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      fetchAllNotes();
    },[]);

// console.log(users);

    // const handleClick = ()=> {
    //   navigate('/detail')
    // }

  return (
    <>
    <div>
      <div>
        <Logo />
      </div>
      

      <div style={{marginLeft:'10rem',marginTop:'-10rem'}} className='div'>
        {
          notes.map((note)=>{
            return(
              <div key = {note.id}>
                <Card  className='cardName'>
                  <Card.Body className='card-body' >
                    <Card.Title style={{fontSize:'large',marginLeft:'2rem',marginTop:'1rem'}}>{note.data.user}</Card.Title> <hr></hr>
                      <Card.Title style={{fontSize:'small',marginTop:'1rem',marginLeft:'1.5rem'}}>{note.data.ratings} </Card.Title>
                        <Card.Title style={{fontSize:'medium',marginTop:'1rem',marginLeft:'1.5rem'}}>{note.data.review} </Card.Title> 
                        {/* <Button type='primary' className='but'>Read More</Button> */}
                  </Card.Body>
               
                </Card>
              </div>
            )
          })
        }
      </div>
      
    </div>
    </>
  )
}

