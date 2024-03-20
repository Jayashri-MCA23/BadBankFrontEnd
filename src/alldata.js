

import {useState} from "react"
import axios from 'axios';
import { useContext } from "react"
import { Card, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './alldata.css'
import { FaTrash } from "react-icons/fa";
export default function Alldata() {
  const [data, setData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);



  function handleClick(){
    axios.get("https://server-fqzz.onrender.com/data").then((item) => {
      setData(item.data);
    });
  }

  const handleDelete =async(name, password)=>{
    const shouldDelete=window.confirm("Are you sure you want to delete this user?");
  
    if (shouldDelete){
      const formData ={email:name,password:password};
  
      try {
        const response =await axios.post("https://server-fqzz.onrender.com/login", formData);
  
        if (response.data) {
          const id =response.data._id; // Use response.data directly
          await axios.delete(`https://server-fqzz.onrender.com/delete/${id}`);
          // Refresh data after successful deletion
          handleClick();
          //alert("Successfully deleted");
        }
      } catch(error) {
        console.error(error);
      }
    } else{
      alert("Deletion canceled");
    }
  };
  

    return(<>
     <button onClick={handleClick}>Fetch/Refresh</button>
            <div className="alldata-container">
           
              <Card className="alldata-card">
                <Card.Body>
                  <h1>Alldata</h1>
                 <hr />
                 
                 <Table striped bordered hover>
                      <thead>
                    <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Password</th>
                        <th>Amount</th>
                        <th>Trash</th>
                      </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.amount}</td>
                            <td><button onClick={()=>handleDelete(item.email,item.password)} className="delete-button"><FaTrash /></button></td>
                          </tr>
                          
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            </>
          );
        }

