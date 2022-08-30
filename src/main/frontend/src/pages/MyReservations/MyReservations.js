import axios from 'axios';
import { authHeader } from '../../DataService';
import Navigation from './../../components/Navigation/Navigation';
import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table'
import { useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { getDateFromString, getTimeFromString } from '../../DateHelper'


const MyReservations = () => {
    const [myReservations, setMyReservations] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const fetchMyReservations = () => {

            const authHeaderData = authHeader() || null;
            console.log(authHeaderData);

            axios.get("http://localhost:8080/api/v1/reservations/my_reservations", { headers: authHeaderData })

                .then(res => {
                    console.log(res);
                    setMyReservations(prev => ([...res.data]))
                })
                .catch(e => {
                    if (e.response.status == 401 || e.response.status == 403) {
                        nav("/login");
                    }
                })

        }

        fetchMyReservations();
    }, []);

    const displayReservations = () => {
        return (
            <div className="slots_list">
                <ListGroup as="ul">
                    {myReservations
                        .map((slot, index) => {
                            let startDate = new Date(slot.startDate);
                            let endDate = new Date(slot.endDate);
                            let startString = getDateFromString(startDate) + ' ' + getTimeFromString(startDate) + ' - ' + getTimeFromString(endDate)
                            return (
                                <ListGroup.Item key={`${slot.startDate}_${slot.endDate}_${slot.room.name}`} action variant="primary">
                                    <b>{slot.room.name}</b> <br></br> {startString}  
                                    <Button as="input"
                                        id={`button_${index}`}
                                        type="button"
                                        value="Zrezygnuj"
                                        className="reservation_button"
                                        onClick={async (e) => {
                                            const isReserved = await submitReservation(e, slot, index);
                                            isReserved ? alert("zrezygnowano z rezerwacji") : alert("ups, coś poszło nie tak");

                                            //setSlotData(prev => prev.map((slot2, index2) => index2 === index ? { ...slot2, reserved: isReserved } : slot2));

                                        }}
                                    />
                                </ListGroup.Item >
                            )
                        })}
                </ListGroup>
            </div>
        );
    }

    const submitReservation = async (e, slot, index) => {
        e.preventDefault();

        const authHeaderData = authHeader() || null;
        document.getElementById(`button_${index}`).disabled = true;
        console.log(authHeaderData);

        return axios.delete(`http://localhost:8080/api/v1/reservations/${slot.id}`, {
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
        <div className="MyReservations">
            <h1>Twoje rezerwacje</h1>
            {displayReservations()}
        </div>

    );
}

export default MyReservations;