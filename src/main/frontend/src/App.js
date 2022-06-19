import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserAccount from './pages/UserAccount/UserAccount';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Reservations from './pages/Reservations/Reservations'
import RoomSlots from './pages/RoomSlots/RoomSlots'


function App() {

  const [isUser,setIsUser] = useState(() => {return true});

  const isUserRoutes = (
    <Routes>
      <Route exact path="/user_account" element={<UserAccount/>}/>
      <Route exact path="/" element={<p>default</p>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/logout"/>
      <Route exact path="/reservations" element={<Reservations/>}/>
      <Route exact path="/login/" element={<Login/>}/>
      <Route exact path="/room/:name" element={<RoomSlots/>}/>
    </Routes>
  )

  const isAdminRoutes = (
    <Routes>
      <Route exact path="/acc" element={<UserAccount/>}/>
      {/* <Route exact path="/" element={<p>default</p>}/> */}
      <Route exact path="/logout"/>
    </Routes>
  )

  return (
    <Layout isUser={isUser}>
      {isUser ? isUserRoutes : isAdminRoutes}
    </Layout>
  );
}




export default App;