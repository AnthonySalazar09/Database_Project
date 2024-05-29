import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Product Management System</Navbar.Brand>
                    <Nav className="me-auto">
                        <LinkContainer to="/suppliers">
                            <Nav.Link>Suppliers</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/customers">
                            <Nav.Link>Customers</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/products">
                            <Nav.Link>Products</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/orders">
                            <Nav.Link>Orders</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/orderdetails">
                            <Nav.Link>Order Details</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/inventoryrestocks">
                            <Nav.Link>Inventory Restocks</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
            <Container className="mt-4">
                {children}
            </Container>
        </>
    );
};

export default Layout;











