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
    }, []);

    // useEffect(() => {
    //     console.log(roomName);
    //     console.log(slotData);
    //     slotData.forEach(element => {
    //         console.log(element);
    //     });
    // }, [slotData])


    const getDate=(offset=0)=>{
        let today = new Date();
        let dd = String(today.getDate()+ offset).padStart(2, '0');
        let mm = String(today.getMonth() + 1 ).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        return today;
    }


    const submitReservation = (e, startHour, endHour, day) => {
        console.log('aaa');
        e.preventDefault();
        let startDate = day +" " + startHour + ":00";
        let endDate = day + " " + endHour + ":00";
        console.log(startDate)
        console.log(endDate)

        const authHeaderData = authHeader() || null;

        axios.post("http://localhost:8080/api/v1/reservation/save", {
            roomName: roomName,
            startDate: startDate,
            endDate: endDate,
          }, { headers: authHeaderData }).then(res => {
            console.log(res);
          }).catch(error => {
            console.log(error.response.data);
          });
    }

    const displaySlots = (slotsToDisplay, offset) => {
        let today = getDate(offset);

        return (
            <div className="slots_list">
                <p>{today}</p>
                <ListGroup as="ul">
                    {slotsToDisplay.map((slot, index) => (
                        <ListGroup.Item key={`${today}_${slot['start']}`}>
                            {slot['start']} - {slot['end']}
                            <Button as="input" disabled={false} type="button" value="Zarezerwuj" className="reservation_button"  onClick={(e) => { submitReservation(e, slot['start'], slot['end'], today) }}/>
                        </ListGroup.Item >
                    ))}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="RoomSlots">
            <h1>Dostępne daty rezerwacji</h1>
            <div className="flex-parent-element">
                <div className="flex-child-element magenta">{displaySlots(slotData,0)}</div>
                <div className="flex-child-element magenta">{displaySlots(slotData,1)}</div>
                <div className="flex-child-element magenta">{displaySlots(slotData,2)}</div>
            </div>
        </div>
    );
}

export default RoomSlots;