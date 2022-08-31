import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomList from '../../components/CustomList/CustomList';
import { authHeader } from '../../DataService';
import './ReservationsAdmin.css';


const ReservationsAdmin = () => {
    const [rooms, setRooms] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    //const [selectedDate, setSelectedDate] = useState(null);


    const nav = useNavigate();
    const dateRef = useRef();


    useEffect(() => {
        const fetchRooms = () => {

            const authHeaderData = authHeader();

            axios.get("http://localhost:8080/api/v1/rooms/get", { headers: authHeaderData })
                .then(res => {
                    let roomObjects = res.data
                    let result = roomObjects.map(a => a.name);
                    setRooms(result);
                    setSelectedRoom(result[0])
                })
                .catch(e => {
                    nav("/login");
                })
        }

        fetchRooms();
    }, []);


    const fetchReservations = async (e) => {

        e.preventDefault()
        const authHeaderData = authHeader() || null;

        axios.get(`http://localhost:8080/api/v1/room_reservations/${selectedRoom}`, { headers: authHeaderData })

            .then(res => {
                setReservations(prev => ([...res.data]))
            })
            .catch(e => {
                if (e.response.status == 401 || e.response.status == 403) {
                    nav("/login");
                }
            })
    }

    return (
        <div className="reservationsAdmin">
            <div className="reservations_form">
                <h2>Wyszukaj rezerwacje</h2>
                <Form id="register_form" onSubmit={fetchReservations}>
                    <select
                        className="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        value={selectedRoom}
                        onChange={e => setSelectedRoom(e.target.value)}>
                        {rooms.map((room, index) => (
                            <option value={room} key={`${room}_${index}`}> {room} </option>))}
                    </select>
                    {/* <input id="startDate" className="form-control" type="date" value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)} /> */}
                    <br></br>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <CustomList reservations={reservations} />
            </div>
        </div>
    );
}

export default ReservationsAdmin;