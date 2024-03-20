
import "./deposit.css";
import React, { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiSolidLogInCircle } from "react-icons/bi";
import { GiClick } from "react-icons/gi";
export default function Withdraw() {
  const [withdraw,setWithdraw] =useState(0);
  const [username,setUsername] =useState("");
  const [password,setPassword] =useState("");
  const [loggedInUser,setLoggedInUser] =useState(null);

  function loginUser(){
    const formData ={email:username,password:password }; // Include password in the request
    axios.post("https://server-fqzz.onrender.com/login", formData).then((response) => {
      console.log(response.data); // Log the response
     
      setLoggedInUser(response.data);
    });
  }

  function handleWithdraw(e) {
    e.preventDefault();
  
    if(loggedInUser){
      const id=loggedInUser._id;
      const withdrawAmount= Number(withdraw);
  
      if (isNaN(withdrawAmount||withdrawAmount <= 0)) {
        alert('Please enter a valid withdraw amount.');
        return;
      }
  
      const updatedAmount=loggedInUser.amount-withdrawAmount;
  console.log(updatedAmount)
      axios.put(`https://server-fqzz.onrender.com/withdraw/${id}`,{ amount:updatedAmount})
        .then(() => {
          alert(`Successfully withdraw ${withdrawAmount} rupees`);
          setLoggedInUser({ ...loggedInUser,amount:updatedAmount });
        })
        .catch((error)=>{
          console.error(error);
          alert('Failed to withdraw amount. Please try again.');
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
            <h1>Withdraw</h1>

            <label>
              Enter a valid (Email):
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
              Enter a valid Password:
              <input type="password" value={password} onChange={(e) => {setPassword(e.target.value);validatePassword(e.target.value)}} />
            </label>
            <br />

            <button onClick={loginUser}><BiSolidLogInCircle />Login</button>

            <br />
            <label>
              <hr />
              Withdraw Amount:
              <input type="text" onChange={(e) => setWithdraw(e.target.value)} disabled={!loggedInUser}required />
            </label>
            <br />
            <button onClick={handleWithdraw} disabled={!withdraw}><GiClick />Submit</button>
            {loggedInUser && <p>Balance: {loggedInUser.amount}</p>}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}