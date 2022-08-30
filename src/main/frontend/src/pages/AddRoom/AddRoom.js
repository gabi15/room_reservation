import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './AddRoom.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { authHeader } from '../../DataService';

const AddRoom = () => {

    const nameRef = useRef();
    const startTimeRef = useRef();
    const endTimeRef = useRef();
    const reservationTimeRef = useRef();
    const nav = useNavigate();

    const validateRoomName = (str) => {
        return str.length > 1 && str.length < 30;
    }

    const validateStartEnd = (start, end) => {
        if (start.localeCompare(end) == -1)
            return true
        return false
    }

    const handleSubmitRoom = async (e) => {
        e.preventDefault();

        const roomName = nameRef.current.value;
        const startTime = startTimeRef.current.value;
        const endTime = endTimeRef.current.value;
        const reservationTimeInMinutes = reservationTimeRef.current.value;

        let isValidRoomName = validateRoomName(roomName) 
        let isValidStartEnd = validateStartEnd(startTime, endTime);
        const authHeaderData = authHeader();

        if (!isValidRoomName) {
            alert("Nieparwidłowe dane - upewnij się że wypełniłeś wszystkie pola");
            return;
        }

        if (!isValidStartEnd) {
            alert("Nieparwidłowe dane - start nie może być przed końcem");
            return;
        }

        axios.post("http://localhost:8080/api/v1/room/save", {
            name: roomName,
            startTime: startTime,
            endTime: endTime,
            reservationTimeInMinutes: reservationTimeInMinutes
        }, {headers: authHeaderData}
        ).then(res => {
            console.log(res);
            alert("Poprawnie dodano nowy pokój")

        }).catch(error => {
            console.log(error.response.data);
            alert("Niepoprawne dane: " + error.response.data.message);
        });

    }

    const options = [];
    let hour;
    for (let i=6;i<24;i+=1) {
        hour = ('0' + i.toString()).slice(-2)+':00'
        options.push(hour)}

    const HourDropdownStart = () => {
        return (
            <Form.Select ref={startTimeRef}>
            {options.map(option => (
                <option key={`start_${option}`} value={`${option}:00`} >
                {option}
                </option>
            ))}
            </Form.Select>
        )
}

    const HourDropdownEnd = () => {

        return (
            <Form.Select ref={endTimeRef}>
            {options.map(option => (
                <option key={`end_${option}`} value={`${option}:00`} >
                {option}
                </option>
            ))}
            </Form.Select>
        )
}

    return (
        <div className="AddRoom">
            <h1>Dodaj nowy pokój</h1>
            {}

            <div className="form_style">

                <Form id="add_room_form" onSubmit={handleSubmitRoom}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nazwa pokoju</Form.Label>
                        <Form.Control ref={nameRef} type="text" placeholder="Wpisz nazwę pokoju" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicSurname">
                        <Form.Label>Godzina startu</Form.Label>
                        {HourDropdownStart()} 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Godzina końca</Form.Label>
                        {HourDropdownEnd()}                           

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Czas trwania rezerwacji</Form.Label>
                        <Form.Select ref={reservationTimeRef}>
                            <option value="30">30 minut</option>
                            <option value="60">60 minut</option>
                            <option value="90">90 minut</option>
                            <option value="120">120 minut</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        </div>

    );
}


export default AddRoom;