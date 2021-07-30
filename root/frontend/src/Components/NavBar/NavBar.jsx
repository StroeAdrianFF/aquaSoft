import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; //imported to resolve "<Link to=></Link>" from react-router-dom

const NavBar = () => {
    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
                <Navbar.Brand>AquaSoft</Navbar.Brand>
                <Nav className='ml-auto'>
                    {/* ml-auto = margin-left: auto */}
                    <LinkContainer to='/angajati'>
                        <Nav.Link>Angajati</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/proiecte'>
                        <Nav.Link>Proiecte</Nav.Link>
                    </LinkContainer>
                    <Nav.Link
                        onClick={() => {
                            localStorage.removeItem('user');
                            window.location.reload();
                        }}>
                        Log Out
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
