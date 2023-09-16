import React, { useState } from 'react'
import '../Components/Login.css'
import {Input,Button} from 'antd';
import {Row, Col} from 'antd';
import movie from '../assets/movie.png';

import { auth } from '../Firebase';
import {createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    // const [names,setNames] = useState();

    async function handleLogin(){
      createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
            navigate('/')
            // console.log(userCredential);
        })
    }

  
  return (
    <div className='logout'>
      <div className='login-page'>
        <Row>
          <Col><img src={movie} style={{marginTop:'10rem',marginLeft:'3rem'}} /></Col>
          <Col className='input-col'>
            <h4>Cinema Elk</h4>
            <Input onChange={(e)=>setEmail(e.currentTarget.value)}placeholder='Enter Email' />
            <Input onChange={(e)=>setPassword(e.currentTarget.value)}placeholder='Enter password' type='password'/>
            <Input onChange={handleName} placeholder='Enter Full Name' type='text' />
            <Button type='primary'>Join the Club</Button>
            <div style={{marginTop:'1rem',color:'white',marginLeft:'1rem'}}>
              Already a member? <a href='/'>Click here</a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Signup
