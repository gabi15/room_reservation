import axios from 'axios';
import {authHeader} from '../../DataService';
import Navigation from './../../components/Navigation/Navigation';
import React, { useState, useEffect, useRef } from 'react';
import './UserAccount.css';
import Table from 'react-bootstrap/Table'


const UserAccount = () => {
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        email: ""
    });


   
    useEffect(()=>{
        const fetchUserProfiles = () => {
            const authHeaderData = authHeader() || null;
            console.log(authHeaderData);
    
            axios.get("http://localhost:8080/api/v1/user/get", {headers: authHeaderData})
            .then(res => {
                console.log(res);
                setUserData(prev => ({ ...prev, ...res.data}))
            })
        }

        fetchUserProfiles();
    }, []);
   
    return( 
    <div className="UserAccount">
        <h1>Witaj {userData.name}</h1>
        <div className="user_data">
        <h3>Twoje dane</h3>
        <Table striped bordered hover>
        <tbody>
        <tr><th>Email</th><td>{userData.email}</td></tr>
        <tr><th>Imię</th><td>{userData.name}</td></tr>
        <tr><th>Nazwisko</th><td>{userData.surname}</td></tr>
        </tbody>    
        </Table>
        </div>
    </div>
    );
   }

export default UserAccount;