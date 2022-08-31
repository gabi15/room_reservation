import axios from 'axios';
import { authHeader } from '../../DataService';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import './Rooms.css'


const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const nav = useNavigate();
    // let displayedRooms;

    const displayRooms = (roomsToDisplay) => {
        return (
            <div className="room_list">
                <ListGroup as="ul">
                    {roomsToDisplay.map((room, index) => (
                        <ListGroup.Item as={Link} to={`/room/${room}`} key={`${index}_${room}`}> {room} </ListGroup.Item >
                    ))}
                </ListGroup>
            </div>
        );
    }


    useEffect(() => {
        const fetchRooms = () => {

            const authHeaderData = authHeader();

            axios.get("http://localhost:8080/api/v1/rooms/get", { headers: authHeaderData })
                .then(res => {
                    let roomObjects = res.data
                    let result = roomObjects.map(a => a.name);
                    setRooms(result);
                })
                .catch(e => {
                    nav("/login");
                })
        }

        fetchRooms();
    }, []);

    return (
        <div className="Rooms">
            <div><h1>Lista sali dostępnych do rezerwacji</h1></div>
            {displayRooms(rooms)}
        </div>
    );
}

export default Rooms;