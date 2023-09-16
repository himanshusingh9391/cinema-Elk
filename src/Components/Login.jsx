import React, { useState } from 'react'
import '../Components/Login.css'
import {Input,Button} from 'antd';
import {Row, Col} from 'antd';
import movie from '../assets/movie.png';

import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    async function handleLogin(){
        signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
            navigate('/home')
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
            <Button onClick={handleLogin}type='primary'>Login Now</Button>
            <div style={{marginTop:'1rem',color:'white',marginLeft:'1rem'}}>
              <span onClick={()=>navigate('/signup')}> Join the club Click here </span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Login
