import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Register.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const nav = useNavigate();

  const validateEmail = (email) => {
    const regEmail = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (regEmail.test(email) && email.length > 1);
  }

  const validatePassword = (password) => {
    return password.length > 4 && password.length < 30;
  }

  const validateSurnameOrName = (str) => {
    return str.length > 1 && str.length < 30;
  }

  const validate = (email, password, name, surname) => {
    let isValid = validateEmail(email) && validatePassword(password) && validateSurnameOrName(surname) && validateSurnameOrName(name);
    return isValid;
  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;

    const isValid = validate(email, password, name, surname);

    if(!isValid){
      alert("Nieparwidłowe dane - upewnij się że wypełniłeś wszystkie pola, oraz, że długość hasła jest większa od 4 a mniejsza od 30");
      return;
    }
    
    axios.post("http://localhost:8080/api/v1/user/save", {
      email: email,
      surname: surname,
      name: name,
      password: password
    }).then(res => {
      console.log(res);
      // const form = document.getElementById('register_form');
      // form.reset();
      nav("/login")
    }).catch(error => {
      console.log(error.response.data);
      alert("Niepoprawne dane: " + error.response.data);
    });

  }

  return (
    <div className="Register">
      <h1>Zarejestruj się aby móc korzystać z szalonych możliwości rezerwacji</h1>

      <div className="form_style">

        <Form id="register_form" onSubmit={handleSubmitRegister}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Imię</Form.Label>
            <Form.Control ref={nameRef} type="text" placeholder="Wpisz imie" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSurname">
            <Form.Label>Nazwisko</Form.Label>
            <Form.Control ref={surnameRef} type="text" placeholder="Wpisz nazwisko" />
          </Form.Group>
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


export default Register;