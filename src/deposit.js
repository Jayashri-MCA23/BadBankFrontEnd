
import React, { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./deposit.css";
import { useEffect } from "react";
import { BiSolidLogInCircle } from "react-icons/bi";
import { GiClick } from "react-icons/gi";
export default function Deposit() {
  const [dep,setDep]=useState(0);
  const [username,setUsername] =useState("");
  const [password,setPassword] =useState("");
  const [loggedInUser,setLoggedInUser] =useState(null);
  
  function loginUser() {
    const formData = { email:username,password:password }; // Include password in the request
    axios.post("https://server-fqzz.onrender.com/login", formData).then((response) => {
      console.log(response); // Log the response
     
      setLoggedInUser(response.data);
    });
  }

  function handleDeposit(e) {
    e.preventDefault();
  
    if (loggedInUser){
      const id=loggedInUser._id;
      const depositAmount=Number(dep);
  
      if (isNaN(depositAmount)||depositAmount <= 0) {
        alert('Please enter a valid deposit amount.');
        return;
      }
  
      const updatedAmount =loggedInUser.amount+depositAmount;
  
      axios.put(`https://server-fqzz.onrender.com/deposit/${id}`,{ amount: updatedAmount})
        .then(()=>{
          alert(`Successfully deposited ${depositAmount} rupees`);
          setLoggedInUser({ ...loggedInUser, amount: updatedAmount});
        })
        .catch((error) => {
          console.error(error);
          alert('Failed to deposit amount. Please try again.');
        });
    } else {
      alert('Please login first.');
    }
  }
  function validatePassword(password) {
    if (password.length > 8 || !/^\d+$/.test(password)) {
      alert('Password must be exactly 8 characters long and contain only numbers.');
    }
  }
  return (
    <>
      <div className="deposit-container">
        <Card className="deposit-card">
          <Card.Body>
            <h1>Deposit</h1>

            <label>
              Enter a valid (Email):
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
             Enter a valid Password:
              <input type="password" value={password} onChange={(e) => {setPassword(e.target.value);validatePassword(e.target.value)}}/>
            </label>
            <br />

            <button onClick={loginUser}><BiSolidLogInCircle />Login</button>

            <br />
            <label>
              <hr />
              Deposit Amount:
              <input type="text" onChange={(e) => setDep(e.target.value)}  disabled={!loggedInUser} required />
            </label>
            <br />
            <button onClick={handleDeposit} disabled={!dep}><GiClick />Submit</button>
            {loggedInUser && <p>Balance: {loggedInUser.amount}</p>}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
