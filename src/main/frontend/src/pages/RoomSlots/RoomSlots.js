import axios from 'axios';
import { authHeader } from '../../DataService';
import Navigation from './../../components/Navigation/Navigation';
import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from "react-router-dom";


const RoomSlots = () => {
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        email: ""
    });
    const nav = useNavigate();
    const { name } = useParams();



    useEffect(() => {
        const fetchUserProfiles = () => {

            const authHeaderData = authHeader() || null;
            console.log(authHeaderData);
            console.log("name");
            console.log(name)

            axios.get(`http://localhost:8080/api/v1/room/${name}`, { headers: authHeaderData })

                .then(res => {
                    console.log(res);
                    setUserData(prev => ({ ...prev, ...res.data }))
                })
                .catch(e => {
                    if(e.response.status==401)
                    {
                        nav("/login");
                    }
                    
                })

        }

        fetchUserProfiles();
    }, []);

    return (
        <div className="RoomSlots">
            <h1>Witaj {userData.name}</h1>
        </div>
    );
}

export default RoomSlots;