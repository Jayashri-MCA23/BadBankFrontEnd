

import './home.css'
import Card from 'react-bootstrap/Card';
import bank from './bank.webp';
export default function Home(){
  return (
    <div>
   <br/> <center>
    <h2><img src="personal-banking.png" alt="Logo" className="logo" />BAD BANK</h2></center> <br/>
 
   <div className="marquee-container">
      <div className="marquee">
      <h4>Welcome to our banking application!- Deposite , Withdraw , Borrow effortlessly, Repay flexibly... 
      Banks are the storytellers of our financial journeys.</h4>
      </div>
    </div>
  <center>
    <Card style={{ width: '50%' }}>
      <Card.Img variant="top" src="image.png" height={250} width={250} alt='bankimage'/>
      <Card.Body>
        <Card.Title>BAD BANK</Card.Title>
        <hr />
        <Card.Text>
        "In the currency of life, banks are the safekeepers of our most precious assets—trust, security, and prosperity."
        </Card.Text>
      </Card.Body>
    </Card>
    </center>
    <br/>
    <br/>
    <br/>
     </div>
  )
}
