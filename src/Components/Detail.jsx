import React, { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap';
import { useLocation, useNavigate} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import {Button } from 'antd'
import Logo from './Logo';
import {db} from '../Firebase';
import {collection, onSnapshot,query} from 'firebase/firestore';
import axios from 'axios';
import Handlepost from './Model';

const IMAGE_API = 'https://image.tmdb.org/t/p/w500';

function Detail() {
    const [notes, setnotes] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [model,setModel] = useState(false);
    const [similarmovies ,setSimilarmovies]=useState([]);
    const {title,overview,poster_path,id} = location.state; 

    const Close =()=> setModel(false);

   const fetchAllNotes = async () =>{
     try{
      const qry = await query(collection(db,"overview"));

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


    useEffect(()=>{
      const Movies_api =`https://api.themoviedb.org/3/movie/${id}/similar?api_key=10b31efc55017d339c319848bdaac1da`;
      axios.get(Movies_api).then((resp)=>{
        setSimilarmovies(resp.data.results)
      })
    },[]);


  return (
    <>
      <div>
      < Logo />
      </div> 
      <hr style={{borderLeft:'5px solid grey',height:'79rem',marginTop:'-10rem',position:'absolute' ,marginLeft:'5rem'}} />
      
      <Row style={{display:'flex',marginLeft:'5rem'}}>
        <Col>
          <Card>
            <img src={IMAGE_API + poster_path} style={{height:350,width:300,marginTop:'-10rem',marginLeft:'3rem'}}/>
            <h2>{title}</h2>
            <p style={{width:300,marginLeft:'4rem',fontSize:'smaller'}}>{overview}</p>
            <Button onClick={()=>setModel(true)} type='primary' style={{width:100,marginLeft:'4rem'}}>Post Review</Button>
            {model && <Handlepost Close={Close}/>}
          </Card>
          <div>
          <h5 style={{marginTop:'3rem',marginLeft:'4rem'}}>Similar movies:</h5>
          < div className='adi'>
          {
              similarmovies.map((mov)=>{
                return(
                  <div style={{marginLeft:'2rem',marginTop:'-2rem'}} >
                  <Card onClick={()=>navigate('/detail',{state:mov})} style={{border:'none',outline:'none',height:'10rem',width:'8rem',marginTop:'3rem',backgroundColor:'#32a88c'}}>
                      <Card.Img style={{height:'6rem',width:'8rem'}} src={IMAGE_API+mov.poster_path}></Card.Img>
                      <Card.Title style={{color:'white',fontSize:'1rem',marginTop:'1rem',fontWeight:'lighter'}}>{mov.title}</Card.Title>
                  </Card>
                  </div>
                )
              })
            }
            </div>
          </div>
        </Col>
        <Col style={{marginLeft:'-6rem',marginTop:'-10rem'}}>          
             <h3> Reviews By Cinema Elk Users</h3>
            <div style={{marginLeft:'6rem',marginTop:'-10rem'}} className='div'>
         {
          notes.map((note)=>{
            return(
              <div key = {note.id}>
                <Card  className='cardDetail'>
                  <Card.Body style={{marginTop:'-2rem',marginLeft:'1rem'}} >
                    <Card.Title style={{fontSize:'large',marginLeft:'2rem',marginTop:'1rem'}}>{note.data.user}</Card.Title> <hr></hr>
                      {/* <Card.Title style={{fontSize:'small',marginTop:'1rem',marginLeft:'1.5rem'}}>{note.data.review} </Card.Title>
                      <Card.Title style={{fontSize:'medium',marginTop:'1rem',marginLeft:'1.5rem'}}>{note.data.ratings} </Card.Title>  */}
                      <div className='ad'>
                      <p>{note.data.review}</p>
                      <p>{note.data.ratings}</p>
                      </div>
                  </Card.Body>
                </Card>
              </div>
            )
          })
        } 
      </div>
        </Col>
      </Row>
    
    </>
 
  
  )
}

export default Detail