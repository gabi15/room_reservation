import axios from 'axios';
import { authHeader } from '../../DataService';
import React, { useState, useEffect } from 'react';
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

            axios.get("http://localhost:8080/api/v1/rooms/get", { headers: authHeaderData })
                .then(res => {
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
                        <ListGroup.Item key={`${index}_${room.name}`}> <b>{room.name}</b> <br></br>{room.startTime} - {room.endTime} <br></br>Czas rezerwacji: {room.reservationTimeInMinutes} minut
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

        return axios.delete(`http://localhost:8080/api/v1/room/${room.id}`, {
            headers: authHeaderData,
        })
            .then(res => {
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