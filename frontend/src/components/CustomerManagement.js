import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

const CustomerManagement = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: ''
    });
    const [updateCustomer, setUpdateCustomer] = useState({
        CustomerID: '',
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: ''
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get('http://localhost:5000/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    };

    const handleNewCustomerChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    const handleUpdateCustomerChange = (e) => {
        const { name, value } = e.target;
        setUpdateCustomer({ ...updateCustomer, [name]: value });
    };

    const handleAddCustomer = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/customers', newCustomer)
            .then(response => {
                alert('Customer added successfully!');
                setNewCustomer({
                    FirstName: '',
                    LastName: '',
                    Email: '',
                    PhoneNumber: ''
                });
                fetchCustomers();
            })
            .catch(error => {
                console.error('There was an error adding the customer!', error);
            });
    };

    const handleUpdateCustomer = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/customers/${updateCustomer.CustomerID}`, updateCustomer)
            .then(response => {
                alert('Customer updated successfully!');
                setUpdateCustomer({
                    CustomerID: '',
                    FirstName: '',
                    LastName: '',
                    Email: '',
                    PhoneNumber: ''
                });
                fetchCustomers();
            })
            .catch(error => {
                console.error('There was an error updating the customer!', error);
            });
    };

    const handleDeleteCustomer = (id) => {
        axios.delete(`http://localhost:5000/customers/${id}`)
            .then(response => {
                alert('Customer deleted successfully!');
                fetchCustomers();
            })
            .catch(error => {
                console.error('There was an error deleting the customer!', error);
            });
    };

    return (
        <div>
            <h2>Customer Management</h2>
            <Row>
                <Col>
                    <h3>Add Customer</h3>
                    <Form onSubmit={handleAddCustomer}>
                        <Form.Group controlId="FirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="FirstName"
                                value={newCustomer.FirstName}
                                onChange={handleNewCustomerChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="LastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="LastName"
                                value={newCustomer.LastName}
                                onChange={handleNewCustomerChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="Email"
                                value={newCustomer.Email}
                                onChange={handleNewCustomerChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="PhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="PhoneNumber"
                                value={newCustomer.PhoneNumber}
                                onChange={handleNewCustomerChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Customer</Button>
                    </Form>
                </Col>
                <Col>
                    <h3>Update Customer</h3>
                    <Form onSubmit={handleUpdateCustomer}>
                        <Form.Group controlId="CustomerID">
                            <Form.Label>Customer ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="CustomerID"
                                value={updateCustomer.CustomerID}
                                onChange={handleUpdateCustomerChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="FirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="FirstName"
                                value={updateCustomer.FirstName}
                                onChange={handleUpdateCustomerChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="LastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="LastName"
                                value={updateCustomer.LastName}
                                onChange={handleUpdateCustomerChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="Email"
                                value={updateCustomer.Email}
                                onChange={handleUpdateCustomerChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="PhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="PhoneNumber"
                                value={updateCustomer.PhoneNumber}
                                onChange={handleUpdateCustomerChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update Customer</Button>
                    </Form>
                </Col>
            </Row>
            <h3>Customers</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.CustomerID}>
                            <td>{customer.CustomerID}</td>
                            <td>{customer.FirstName}</td>
                            <td>{customer.LastName}</td>
                            <td>{customer.Email}</td>
                            <td>{customer.PhoneNumber}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteCustomer(customer.CustomerID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CustomerManagement;
