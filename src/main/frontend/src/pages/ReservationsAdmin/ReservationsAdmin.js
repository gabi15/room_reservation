import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import CustomList from '../../components/CustomList/CustomList';
import { getDateFromString, getTimeFromString } from '../../DateHelper';
import { authHeader } from '../../DataService';
import './ReservationsAdmin.css';


const ReservationsAdmin = () => {
    const [rooms, setRooms] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const nav = useNavigate();
    const dateRef = useRef();
    const roomRef = useRef();


    useEffect(() => {
        const fetchRooms = () => {

            const authHeaderData = authHeader();
            console.log(authHeaderData);

            axios.get("http://localhost:8080/api/v1/rooms", { headers: authHeaderData })
                .then(res => {
                    let roomObjects = res.data
                    let result = roomObjects.map(a => a.name);
                    console.log(result);
                    setRooms(result);
                    setSelectedRoom(result[0])
                    console.log(rooms);
                    // displayedRooms = displayRooms(rooms);
                })
                .catch(e => {
                    if (e.response.status == 401) {
                        nav("/login");
                    }
                })
        }

        fetchRooms();
    }, []);


    const fetchReservations = async (e) => {

        e.preventDefault()
        const authHeaderData = authHeader() || null;
        console.log(authHeaderData);

        axios.get(`http://localhost:8080/api/v1/room_reservations/${selectedRoom}`, { headers: authHeaderData })

            .then(res => {
                console.log(res);
                setReservations(prev => ([...res.data]))
            })
            .catch(e => {
                if (e.response.status == 401 || e.response.status == 403) {
                    nav("/login");
                }
            })
    }

    const displayReservations = () => {
        <ListGroup as="ul">
            {reservations
                .map((slot, index) => {
                    let startDate = new Date(slot.startDate);
                    let endDate = new Date(slot.endDate);
                    let startString = getDateFromString(startDate) + ' ' + getTimeFromString(startDate) + ' - ' + getTimeFromString(endDate)
                    return (
                        <ListGroup.Item key={`${slot.startDate}_${slot.endDate}_${slot.room.name}`} action variant="primary">
                            <b>{slot.room.name}</b> <br></br> {startString}
                            {/* <Button as="input"
                            id={`button_${index}`}
                            type="button"
                            value="Zrezygnuj"
                            className="reservation_button"
                            onClick={async (e) => {
                                const isReserved = await submitReservation(e, slot, index);
                                isReserved ? alert("zrezygnowano z rezerwacji") : alert("ups, coś poszło nie tak");

                                //setSlotData(prev => prev.map((slot2, index2) => index2 === index ? { ...slot2, reserved: isReserved } : slot2));

                            }}
                        /> */}
                        </ListGroup.Item >
                    )
                })}
        </ListGroup>
    }

    return (
        <div className="ReservationsAdmin">
            <div className="reservations_form">
                <Form id="register_form" onSubmit={fetchReservations}>
                    <select
                        className="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        value={selectedRoom}
                        onChange={e => setSelectedRoom(e.target.value)}>
                            {rooms.map((room, index) => (
                                <option value={room} key={`${room}_${index}`}> {room} </option>))}
                    </select>
                    <input id="startDate" className="form-control" type="date" ref={dateRef} />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <CustomList reservations={reservations} />
        </div>
    );
}

export default ReservationsAdmin;