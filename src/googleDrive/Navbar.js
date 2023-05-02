import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Spacer = () => <div style={{ flexGrow: 1 }}></div>;

export default function NavbarComponent() {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand as={Link} to="/" style={{ marginLeft: '10px'}}>Google drive</Navbar.Brand>
            <Spacer/>
            <Nav>
                <Nav.Link as={Link} to="/user" style={{ marginRight: '10px'}}>Profile</Nav.Link>
            </Nav>
        </Navbar>
    )
}
