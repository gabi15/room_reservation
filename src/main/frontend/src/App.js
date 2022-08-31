import React, { useState, useEffect } from 'react';
import './App.css';
import UserAccount from './pages/UserAccount/UserAccount';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Rooms from './pages/Rooms/Rooms';
import RoomSlots from './pages/RoomSlots/RoomSlots';
import MyReservations from './pages/MyReservations/MyReservations';
import ReservationsAdmin from './pages/ReservationsAdmin/ReservationsAdmin';
import AddRoom from './pages/AddRoom/AddRoom';
import RoomsAdmin from './pages/RoomsAdmin/RoomsAdmin';
import AuthenticationService from './AuthenticationService';
import AddAdmin from './pages/AddAdmin/AddAdmin';



function App() {

  const [isUser, setIsUser] = useState(!AuthenticationService.getIsAdmin());

  useEffect(() => {
    setIsUser(!AuthenticationService.getIsAdmin());
  }, [])
  // const [isLogged,setIsLogged] = useState(false);

  const isUserRoutes = (
    <Routes>
      <Route exact path="/login/" element={<Login setUser={setIsUser} />} />
      <Route exact path="/user_account" element={<UserAccount />} />
      <Route exact path="/rooms" element={<Rooms />} />
      <Route exact path="/room/:roomName" element={<RoomSlots />} />
      <Route exact path="/my_reservations/" element={<MyReservations />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/logout" />
    </Routes>
  )

  const isAdminRoutes = (
    <Routes>
      <Route exact path="/login/" element={<Login setUser={setIsUser} />} />
      <Route exact path="/user_account" element={<UserAccount />} />
      <Route exact path="/reservations_admin/" element={<ReservationsAdmin />} />
      <Route exact path="/add_room/" element={<AddRoom />} />
      <Route exact path="/rooms_admin/" element={<RoomsAdmin />} />
      <Route exact path="/room/:roomName" element={<RoomSlots />} />
      <Route exact path="/rooms" element={<Rooms />} />
      <Route exact path="/add_admin" element={<AddAdmin />} />
      <Route exact path="/logout" />
    </Routes>
  )

  return (
    <Layout isUser={isUser}>
      {isUser ? isUserRoutes : isAdminRoutes}
    </Layout>
  );
}




export default App;