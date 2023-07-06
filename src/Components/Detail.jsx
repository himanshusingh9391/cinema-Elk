import React, { useEffect, useState } from 'react'
import {Row, Col} from 'antd';
import { useLocation} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { Button } from 'antd';
import { AiTwotoneHome } from "react-icons/ai";
import { BsCameraReelsFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import {Menu} from 'antd';
import movie from '../assets/movie.png'
import {db} from '../Firebase';
import {collection, onSnapshot,query} from 'firebase/firestore';

const IMAGE_API = 'https://image.tmdb.org/t/p/w500';

function Detail() {
  const [notes, setnotes] = useState([]);
  const [user, setUser] = useState('');
  const location = useLocation();
  const {title,overview,poster_path} = location.state; 

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
        <a href='/'><VscAccount  style={{height:'2rem',width:30}}/></a>   
      </div>

      <Row>
        <Col>
        <Card>
            <img src={IMAGE_API + poster_path} style={{height:500,width:400,marginTop:'-7rem',marginLeft:'10rem'}}/>
            <h2>{title}</h2>
            <p style={{width:300,marginLeft:'10rem',fontSize:'smaller'}}>{overview}</p>
            <Button type='primary' style={{width:100,marginLeft:'10rem'}}>Post Review</Button>
          </Card>
        </Col>
        <Col style={{marginLeft:'6rem',marginTop:'-10rem'}}>          
            <h3> Reviews By Cinema Elk Users</h3>
            <div style={{marginLeft:'6rem',marginTop:'-10rem'}} className='div'>
         {
          notes.map((note)=>{
            return(
              <div key = {note.id}>
                <Card  className='cardDetail'>
                  <Card.Body style={{marginTop:'-2rem',marginLeft:'1rem'}} >
                    <Card.Title style={{fontSize:'large',marginLeft:'2rem',marginTop:'1rem'}}>{note.id}</Card.Title> <hr></hr>
                      <Card.Title style={{fontSize:'small',marginTop:'1rem',marginLeft:'1.5rem'}}>{note.data.rating} </Card.Title>
                      <Card.Title style={{fontSize:'medium',marginTop:'1rem',marginLeft:'1.5rem'}}>{note.data.review} </Card.Title> 
                  </Card.Body>
               
                </Card>
              </div>
            )
          })
        } 
      </div>
            
        </Col>
      </Row>
    </div>
  )
}

export default Detail