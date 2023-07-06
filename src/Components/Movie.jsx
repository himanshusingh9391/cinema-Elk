import React,{useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import {Menu,Button} from 'antd';
import movie from '../assets/movie.png'
import { AiTwotoneHome } from "react-icons/ai";
import { BsCameraReelsFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import {db} from '../Firebase';
import {collection, onSnapshot,query} from 'firebase/firestore';

export default function Movie() {
    const [notes, setnotes] = useState([]);
    const [user,setUsers] = useState('')
    const navigate = useNavigate();

    const fetchAllNotes = async () =>{
      try{
        const qry = await query(collection(db,'users'));

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
    <div>
         <div>
          <Menu className='menu'>
          <Menu.Item to="/" >
            <img src={movie} style={{height:30,width:50}}/>
            <span>Cinema Elk</span>
            <Button onClick={()=>navigate('/login')} style={{marginLeft:'65rem'}}>{ user ? 'Login' : 'Logout'}</Button>
          </Menu.Item>
          </Menu>  
      </div>
      <div className='icons'>
        <a href='/'> <AiTwotoneHome style={{height:'2rem',width:30}}/> </a>
        <a href='/movie'> <BsCameraReelsFill style={{height:'2rem',width:30}}/></a>
        <a href=''><VscAccount  style={{height:'2rem',width:30}}/></a>   
      </div>

      <div style={{marginLeft:'10rem',marginTop:'-10rem'}} className='div'>
        {
          notes.map((note)=>{
            return(
              <div key = {note.id}>
                <Card  className='cardName'>
                  <Card.Body className='card-body' >
                    <Card.Title style={{fontSize:'large',marginLeft:'2rem',marginTop:'1rem'}}>{note.id}</Card.Title> <hr></hr>
                      <Card.Title style={{fontSize:'small',marginTop:'1rem',marginLeft:'1.5rem'}}>{note.data.rating} </Card.Title>
                        <Card.Title style={{fontSize:'medium',marginTop:'1rem',marginLeft:'1.5rem'}}>{note.data.review} </Card.Title> 
                        <Button type='primary' className='but'>Read More</Button>
                  </Card.Body>
               
                </Card>
              </div>
            )
          })
        }
      </div>
      
    </div>
  )
}

