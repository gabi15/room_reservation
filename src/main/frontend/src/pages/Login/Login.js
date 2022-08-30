import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';
import axios from 'axios';
import authHeader from '../../DataService';
import { useNavigate } from "react-router-dom";

function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const nav = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
            
    try {
      const res = await axios.post("http://localhost:8080/api/v1/login", {
        "email": email,
        "password": password
      });

      console.log(res);
      if(res.data.access_token){
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res.data.access_token);
        nav("/user_account")
      }
      
      return res.data;
      
    } catch (error) {
      console.log(error.response.data);
      alert("Niepoprawne dane: " + error.response.data.message);
    }
    
  }

//   const fetchUserProfile = () => {
//     console.log(authHeader())
//     axios.get("http://localhost:8080/api/v1/user/get", {headers: authHeader()})
//     .then(res => {
//         console.log(res);
//         setUserData(prev => ({ ...prev, ...res.data}))
//     })

// }

// useEffect(()=>{
//   fetchUserProfiles();
// }, []);

  return (
    <div className="Login">
      <h1>Zaloguj się aby móc korzystać z szalonych możliwości logowania</h1>

      <div className="form_style">

        <Form id="login_form" onSubmit={handleSubmitLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Adres email</Form.Label>
            <Form.Control ref={emailRef} type="email" placeholder="Wpisz email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Hasło</Form.Label>
            <Form.Control ref={passwordRef} type="password" placeholder="Wpisz hasło" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

    </div>

  );
}


export default Login;