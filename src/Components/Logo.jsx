import React from 'react'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneHome } from "react-icons/ai";
import { BsCameraReelsFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import {Menu} from 'antd';
import movie from '../assets/movie.png'

function Logo() {
  const navigate = useNavigate();
  return (
    <div>
         <div>
          <Menu className='menu'>
          <Menu.Item to="/home" >
            <img src={movie} style={{height:30,width:50}}/>
            <span>Cinema Elk</span>
            <Button onClick={()=>navigate('/')} style={{marginLeft:'65rem'}}>Logout</Button>
          </Menu.Item>
          </Menu>  
      </div>
      <div className='icons'>
        <a href='/home'> <AiTwotoneHome style={{height:'2rem',width:30}}/> </a>
        <a href='/movie'> <BsCameraReelsFill style={{height:'2rem',width:30}}/></a>
        <a href='/home'><VscAccount  style={{height:'2rem',width:30}}/></a>   
      </div>
    </div>
  )
}

export default Logo