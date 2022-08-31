import axios from 'axios';
import { authHeader } from '../../DataService';
import Navigation from '../../components/Navigation/Navigation';
import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import { Button } from 'react-bootstrap';
import './RoomsAdmin.css'


const RoomsAdmin = () => {
    const [rooms, setRooms] = useState([]);
    const nav = useNavigate();
    
    useEffect(() => {
        const fetchRooms = () => {

            const authHeaderData = authHeader();
            console.log(authHeaderData);

            axios.get("http://localhost:8080/api/v1/rooms/get", { headers: authHeaderData })
                .then(res => {
                    // let roomObjects = res.data
                    // let result = roomObjects.map(a => a.name);
                    // console.log(result);
                    setRooms(res.data);
                })
                .catch(e => {
                        nav("/login");
                })
        }

        fetchRooms();
    }, []);

    const displayRooms = (roomsToDisplay) => {
        return (
            <div className="room_list">
                <ListGroup as="ul">
                    {roomsToDisplay.map((room, index) => (
                        <ListGroup.Item as={Link} to={`/room/${room.name}`} key={`${index}_${room.name}`}> {room.name}
                            <Button as="input"
                                id={`button_${index}`}
                                type="button"
                                value="Usuń pokój"
                                className="reservation_button"
                                onClick={async (e) => {
                                    const isSuccessful = await deleteRoom(e, room, index);
                                    isSuccessful ? alert("usunięto pokój") : alert("ups, coś poszło nie tak");
                                }}
                            />
                        </ListGroup.Item >
                    ))}
                </ListGroup>
            </div>
        );
    }

    const deleteRoom = async (e, room, index) => {
        e.preventDefault();

        const authHeaderData = authHeader() || null;
        document.getElementById(`button_${index}`).disabled = true;
        console.log(authHeaderData);

        return axios.delete(`http://localhost:8080/api/v1/room/${room.id}`, {
            headers: authHeaderData,
        })
            .then(res => {
                console.log(res);
                return true;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    }





    return (
        <div className="RoomsAdmin">
            <div><h1>Lista sali dostępnych do rezerwacji</h1></div>
            {displayRooms(rooms)}
        </div>
    );
}

export default RoomsAdmin;