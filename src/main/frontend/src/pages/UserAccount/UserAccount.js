import axios from 'axios';
import { authHeader } from '../../DataService';
import React, { useState, useEffect, useRef } from 'react';
import './UserAccount.css';
import Table from 'react-bootstrap/Table'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'



const UserAccount = () => {
    const [userData, setUserData] = useState({
        id:"",
        name: "",
        surname: "",
        email: ""
    });
    const nav = useNavigate();
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();


    const handleSubmitRegister = async (e) => {
        e.preventDefault();
    
        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        const email = emailRef.current.value;

        const authHeaderData = authHeader();

        const params = new URLSearchParams();
        params.append('name', name);
        params.append('surname', surname);
        params.append('email', email);
        
        axios.put(`http://localhost:8080/api/v1/user/${userData.id}`, params,
        { headers: authHeaderData }).then(res => {
          console.log(res);
          setUserData({...userData, name:name, surname:surname});
          alert("Poprawnie zmieniono dane")
        }).catch(error => {
          console.log(error.response.data);
          alert("Niepoprawne dane: " + error.response.data);
        });

      }

    useEffect(() => {
        const fetchUserProfiles = () => {

            const authHeaderData = authHeader() || null;
            console.log(authHeaderData);

            axios.get("http://localhost:8080/api/v1/user/get", { headers: authHeaderData })

                .then(res => {
                    console.log(res);
                    setUserData(prev => ({ ...prev, ...res.data }))
                })
                .catch(e => {
                        nav("/login");        
                })
        }
        fetchUserProfiles();
    }, []);

    return (
        <div className="userAccount">
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
            
           <br></br> 
           <h2>Zmiana danych</h2>
        <Form id="update_form" onSubmit={handleSubmitRegister}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Imię</Form.Label>
            <Form.Control ref={nameRef} type="text" defaultValue={userData.name} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSurname">
            <Form.Label>Nazwisko</Form.Label>
            <Form.Control ref={surnameRef} type="text" defaultValue={userData.surname} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSurname">
            <Form.Label>Email</Form.Label>
            <Form.Control ref={emailRef} type="text" defaultValue={userData.email} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
        </div>
    );
}

export default UserAccount;