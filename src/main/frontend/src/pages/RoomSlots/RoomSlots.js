import axios from 'axios';
import { authHeader } from '../../DataService';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import './RoomSlots.css'


const RoomSlots = () => {
    const [slotData, setSlotData] = useState([]);
    const nav = useNavigate();
    const { roomName } = useParams();

    useEffect(() => {
        const fetchSlots = () => {

            const authHeaderData = authHeader() || null;

            axios.get(`http://localhost:8080/api/v1/room/${roomName}`, { headers: authHeaderData })

                .then(res => {
                    console.log(res);
                    setSlotData(prev => ([...prev, ...res.data]))
                })
                .catch(e => {
                    nav("/login");
                })

        }

        fetchSlots();
    }, [roomName]);

    // useEffect(() => {
    //     console.log(roomName);
    //     console.log(slotData);
    //     slotData.forEach(element => {
    //         console.log(element);
    //     });
    // }, [slotData])


    const getDate = (offset = 0) => {
        let today = new Date();
        let dd = String(today.getDate() + offset).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        return today;
    }

    const getActionVariant = (isReserved) => {
        if (isReserved) {
            return "danger"
        }
        return "info"
    }


    const submitReservation = async (e, startHour, endHour, day, isDisabled) => {
        console.log('aaa');
        e.preventDefault();
        let startDate = day + " " + startHour + ":00";
        let endDate = day + " " + endHour + ":00";
        console.log(startDate)
        console.log(endDate)

        const authHeaderData = authHeader() || null;

        axios.post("http://localhost:8080/api/v1/reservation/save", {
            roomName: roomName,
            startDate: startDate,
            endDate: endDate,
        }, { headers: authHeaderData })
            .then(res => {
                console.log(res);
                return true;
            })
            .catch(error => {
                console.log(error.response.data);
                return false;
            });


    }

    const displaySlots = (slotsToDisplay, offset) => {
        let today = getDate(offset);

        return (
            <div className="slots_list">
                <p>{today}</p>
                <ListGroup as="ul">
                    {slotsToDisplay
                        .map((slot, index) => {
                            if (slot.date == today) {
                                let isDisabled = slot['reserved'];
                                return (
                                    <ListGroup.Item key={`${today}_${slot['start']}`} action variant={getActionVariant(isDisabled)}>
                                        {slot['start']} - {slot['end']}
                                        <Button as="input"
                                            disabled={isDisabled}
                                            type="button"
                                            value="Zarezerwuj"
                                            className="reservation_button"
                                            onClick={(e) => {
                                                isDisabled = submitReservation(e, slot['start'], slot['end'], today);

                                            }}
                                        />
                                    </ListGroup.Item >
                                )
                            } else {
                                return null;
                            }
                        })}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="RoomSlots">
            <h1>Dostępne daty rezerwacji</h1>
            <div className="flex-parent-element">
                <div className="flex-child-element magenta">{displaySlots(slotData, 0)}</div>
                <div className="flex-child-element magenta">{displaySlots(slotData, 1)}</div>
                <div className="flex-child-element magenta">{displaySlots(slotData, 2)}</div>
            </div>
        </div>
    );
}

export default RoomSlots;