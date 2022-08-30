import axios from 'axios';
import { authHeader } from '../../DataService';
import Navigation from './../../components/Navigation/Navigation';
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

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
    
        //const email = emailRef.current.value;
        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        const authHeaderData = authHeader();
        
        axios.put(`http://localhost:8080/api/v1/user/${userData.id}`, {
          surname: surname,
          name: name
        }, { headers: authHeaderData }).then(res => {
          console.log(res);
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
                    if(e.response.status==401)
                    {
                        nav("/login");
                    }           
                })
        }
        fetchUserProfiles();
    }, []);

    return (
        <div className="UserAccount">
            <h1>Witaj {userData.name}</h1>
            <div className="user_data">
                <h3>Twoje dane</h3>
                <Table striped bordered hover>
                    <tbody>
                        <tr><th>Email</th><td>{userData.email}</td></tr>
                        <tr><th>Imię</th><td>{userData.name}</td></tr>
                        <tr><th>Nazwisko</th><td>{userData.surname}</td></tr>
                        <tr><th>Nazwisko</th><td>{userData.id}</td></tr>

                    </tbody>
                </Table>
            </div>

        <Form id="update_form" onSubmit={handleSubmitRegister}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Imię</Form.Label>
            <Form.Control ref={nameRef} type="text" placeholder={userData.name} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSurname">
            <Form.Label>Nazwisko</Form.Label>
            <Form.Control ref={surnameRef} type="text" placeholder={userData.surname} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
    );
}

export default UserAccount;