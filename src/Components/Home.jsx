import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { AiTwotoneHome } from "react-icons/ai";
import { BsCameraReelsFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import movie from '../assets/movie.png'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import {Menu,Button} from 'antd';


const MOVIE_API = 'https://api.themoviedb.org/3/movie/now_playing?api_key=75d98e9e33ee53c780024796db972ead'
const POPULAR_API = 'https://api.themoviedb.org/3/movie/popular?api_key=75d98e9e33ee53c780024796db972ead'
const TOP_API = 'https://api.themoviedb.org/3/movie/top_rated?api_key=75d98e9e33ee53c780024796db972ead'
const UPCOMING_API = 'https://api.themoviedb.org/3/movie/upcoming?api_key=75d98e9e33ee53c780024796db972ead'

const IMAGE_API = 'https://image.tmdb.org/t/p/w500';

export default function Home () {
  const  settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 8,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [movies,setMovies] =  useState([]);
  const [populars,setPopulars] = useState([]);
  const [tops,setTops] = useState([]);
  const [upcomings,setUpcomings] = useState([]);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(MOVIE_API).then((resp)=>{
      setMovies(resp.data.results)
    })
  },[]);

  useEffect(()=>{
    axios.get(POPULAR_API).then((resp)=>{
      setPopulars(resp.data.results)
    })
  },[]);

  useEffect(()=>{
    axios.get(TOP_API).then((resp)=>{
      setTops(resp.data.results)
    })
  },[]);

  useEffect(()=>{
    axios.get(UPCOMING_API).then((resp)=>{
      setUpcomings(resp.data.results)
    })
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
        <a href='/home'> <AiTwotoneHome style={{height:'2rem',width:30}}/> </a>
        <a href='/movie'> <BsCameraReelsFill style={{height:'2rem',width:30}}/></a>
        <a href='/home'><VscAccount  style={{height:'2rem',width:30}}/></a>   
      </div>
      <hr style={{borderLeft:'5px solid grey',height:'79rem',marginTop:'-10rem',position:'absolute' ,marginLeft:'5rem'}} />

      <div style={{marginLeft:'10rem', marginTop:'-12rem'}}>
        <h4>Now Playing</h4>

      <div className='poster' style={{backgroundColor:'#32a88c',marginTop:'2rem',marginLeft:'1rem'}}>
        <Slider  {...settings} style={{width:'170vh',marginLeft:'1.8rem'}} >
          {movies.map(movie => {
            return (
                <div key={movie.id}>
                  <Card style={{width:'2rem',marginLeft:'4rem',backgroundColor:'#32a88c'}} onClick={()=> navigate('/detail',{state:movie})}>
                    <Card.Img src={IMAGE_API + movie.poster_path} style={{marginTop:'0.2rem',height:162,width:150,marginLeft:'1rem'}} ></Card.Img>
                    <Card.Title style={{width:150,fontSize:'medium'}}>{movie.title}</Card.Title>
                  </Card>
                </div>
            )
          })}
       </Slider>
      </div>
    </div>
    <div style={{marginLeft:'10rem', marginTop:'2rem'}}>
        <h4>Popular Movies</h4>

      <div className='poster' style={{backgroundColor:'#32a88c',marginTop:'2rem',marginLeft:'1rem'}}>
      <Slider  {...settings} style={{width:'170vh',marginLeft:'1.8rem'}} >
        {populars.map(popular => {
          return (
              <div key={popular.id}>
                <Card style={{width:'8rem',marginLeft:'4rem',backgroundColor:'#32a88c'}} onClick={()=>navigate('/detail',{state:popular})}>
                  <Card.Img src={IMAGE_API + popular.poster_path} style={{marginTop:'1rem',height:130,width:130,marginLeft:'1rem'}}></Card.Img>
                  <Card.Title style={{width:150,fontSize:'medium'}}>{popular.title}</Card.Title>
                </Card>
              </div>
          )
        })}
        </Slider>
      </div>
    </div>

    <div style={{marginLeft:'10rem', marginTop:'2rem'}}>
        <h4>Top Rated </h4>

      <div className='poster' style={{backgroundColor:'#32a88c',marginTop:'2rem',marginLeft:'1rem'}} >
      <Slider  {...settings} style={{width:'170vh',marginLeft:'1.8rem'}} >
        {tops.map(top => {
          return (
              <div key={top.id}>
                <Card style={{width:'8rem',marginLeft:'4rem',backgroundColor:'#32a88c'}} onClick={()=>navigate('/detail',{state:top})}>
                  <Card.Img src={IMAGE_API + top.poster_path} style={{marginTop:'1rem',height:130,width:130,marginLeft:'1rem'}}></Card.Img>
                  <Card.Title style={{width:150,fontSize:'medium'}}>{top.title}</Card.Title>
                </Card>
              </div>
          )
        })}
        </Slider>
      </div>
    </div>
    
    <div style={{marginLeft:'10rem', marginTop:'2rem'}}>
        <h4>Upcoming Movies </h4>

      <div className='poster' style={{backgroundColor:'#32a88c',marginTop:'2rem',marginLeft:'1rem'}}>
      <Slider  {...settings} style={{width:'170vh',marginLeft:'1.8rem'}} >
        {upcomings.map(upcoming => {
          return (
              <div key={upcoming.id}>
                <Card style={{width:'8rem',marginLeft:'4rem',backgroundColor:'#32a88c'}} onClick={()=>navigate('/detail',{state:upcoming})}>
                  <Card.Img src={IMAGE_API + upcoming.poster_path} style={{marginTop:'1rem',height:130,width:130,marginLeft:'1rem'}}></Card.Img>
                  <Card.Title style={{width:150,fontSize:'medium'}}>{upcoming.title}</Card.Title>
                </Card>
              </div>
          )
        })}
        </Slider>
      </div>
    </div>
  </div>
  )
}



