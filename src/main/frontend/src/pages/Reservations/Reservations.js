import axios from 'axios';
import { authHeader } from '../../DataService';
import Navigation from './../../components/Navigation/Navigation';
import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table'
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';


const Reservations = () => {
    const [rooms, setRooms] = useState([]);
    const nav = useNavigate();
    // let displayedRooms;

    const displayRooms = (roomsToDisplay) => {
        return (
            <ol>
                {roomsToDisplay.map((room, index) => (
                    <Link to={`/room/${room}`} key={`${index}_${room}`}> {room} </Link>
                ))}
            </ol>
        );
    }



    useEffect(() => {
        const fetchReservations = () => {

            const authHeaderData = authHeader();
            console.log(authHeaderData);

            axios.get("http://localhost:8080/api/v1/rooms", { headers: authHeaderData })
                .then(res => {
                    let roomObjects = res.data
                    let result = roomObjects.map(a => a.name);
                    console.log(result);
                    setRooms(result);
                    console.log(rooms);
                    // displayedRooms = displayRooms(rooms);
                })
                .catch(e => {
                    if (e.response.status == 401) {
                        nav("/login");
                    }

                })

        }

        fetchReservations();
    }, []);

    return (
        <div className="Reservations">
            <div><h1>Witaj </h1></div>
            {displayRooms(rooms)}
            {/* <p>{rooms}</p> */}
            {/* <div className="user_data">
                <h3>Twoje dane</h3>
                <Table striped bordered hover>
                    <tbody>
                        <tr><th>Email</th><td>{userData.email}</td></tr>
                        <tr><th>Imię</th><td>{userData.name}</td></tr>
                        <tr><th>Nazwisko</th><td>{userData.surname}</td></tr>
                    </tbody>
                </Table>
            </div> */}
        </div>
    );
}

export default Reservations;