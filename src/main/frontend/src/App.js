import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserAccount from './pages/UserAccount/UserAccount';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Rooms from './pages/Rooms/Rooms';
import RoomSlots from './pages/RoomSlots/RoomSlots';
import MyReservations from './pages/MyReservations/MyReservations';
import ReservationsAdmin from './pages/ReservationsAdmin/ReservationsAdmin';



function App() {

  const [isUser,setIsUser] = useState(() => {return true});

  const isUserRoutes = (
    <Routes>
      <Route exact path="/user_account" element={<UserAccount/>}/>
      <Route exact path="/" element={<p>default</p>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/logout"/>
      <Route exact path="/rooms" element={<Rooms/>}/>
      <Route exact path="/login/" element={<Login/>}/>
      <Route exact path="/room/:roomName" element={<RoomSlots/>}/>
      <Route exact path="/my_reservations/" element={<MyReservations/>}/>

      <Route exact path="/reservations_admin/" element={<ReservationsAdmin/>}/>
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