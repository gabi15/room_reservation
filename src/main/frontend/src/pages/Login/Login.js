import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';
import axios from 'axios';
import {authHeader} from '../../DataService';
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
        try {
          const authHeaderData = authHeader();
          const res2 = await axios.get("http://localhost:8080/api/v1/user/get_role", { headers: authHeaderData }
          );
          let roles = res2.data
          let isAdmin = false;
          roles.forEach(role => {if (role.name="ROLE_ADMIN"){
            isAdmin = true;
          }});
          if(isAdmin){
            localStorage.setItem("isAdmin", true);
          }
          
        } catch (error) {
          console.log(error.response.data);
        }
        nav("/user_account")
      }
      
      return res.data;
      
    } catch (error) {
      console.log(error.response.data);
      alert("Niepoprawne dane: " + error.response.data.message);
    }
    
  }


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
          <Form.Check 
            type="checkbox"
            id="default-checkbox"
            label="loguj jako admin"
          />
          <br></br>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

    </div>

  );
}


export default Login;