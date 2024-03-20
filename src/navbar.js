import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

export default function CustomNavbar() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md" className="custom-navbar">
                <Navbar.Brand href="#/" style={{ padding:"10px"}}><img src="personal-banking.png" alt="Logo" className="logo" />BAD BANK</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setShowMenu(!showMenu)}>
                    {showMenu ? <FaTimes /> : <FaBars />}
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className={showMenu ? 'show' : ''}>
                    <Nav className="ml-auto">
                        <Nav.Link className="customHover" href="#/create">Create</Nav.Link>
                        <Nav.Link className="customHover1" href="#/deposit">Deposit</Nav.Link>
                        <Nav.Link className="customHover2" href="#/withdraw">Withdraw</Nav.Link>
                        <Nav.Link className="customHover3" href="#/alldata">Alldata</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}
