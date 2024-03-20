
import React, { useState } from "react";
import axios from 'axios';
import { Form, Button, Card, CardBody } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './create.css';
import { MdAccountBalance } from "react-icons/md";
export default function Create() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [accountCreated,setAccountCreated] = useState(false);

  async  function handleSubmit(e){
    e.preventDefault();
    
         alert("Successfully created")
    const formData = {
      name:name,
      email:email,
      password:password,
      amount:0
    };

    try {
      const response =await axios.post('https://server-fqzz.onrender.com/create', formData);
      console.log(response.data);
      setAccountCreated(true);
    } catch(error){
      console.error(error);
    }
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleAddAnotherAccount=()=>{
    setAccountCreated(false);
   
  };
  function validatePassword(password) {
    if (password.length > 8 || !/^\d+$/.test(password)) {
      alert('Password must be exactly 8 characters long and contain only numbers.');
    }
  }

 const isSubmitDisabled = !name.trim()||!email.trim()||!password.trim();

  return (
    <div className='create-container'>
      <Card>
        <CardBody>
          <h1>Create</h1>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {setPassword(e.target.value);validatePassword(e.target.value)}}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
            <MdAccountBalance /> {accountCreated ?'Account Created':'Create Account'}
            </Button>

            {accountCreated &&(
              <Button variant="info"  onClick={handleAddAnotherAccount}>
                <MdAccountBalance />Add Another Account
              </Button>
            )}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

