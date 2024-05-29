import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

const SupplierManagement = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({
        Name: '',
        ContactName: '',
        PhoneNumber: '',
        Email: ''
    });
    const [updateSupplier, setUpdateSupplier] = useState({
        SupplierID: '',
        Name: '',
        ContactName: '',
        PhoneNumber: '',
        Email: ''
    });

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = () => {
        axios.get('http://localhost:5000/suppliers')
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the suppliers!', error);
            });
    };

    const handleNewSupplierChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value });
    };

    const handleUpdateSupplierChange = (e) => {
        const { name, value } = e.target;
        setUpdateSupplier({ ...updateSupplier, [name]: value });
    };

    const handleAddSupplier = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/suppliers', newSupplier)
            .then(response => {
                alert('Supplier added successfully!');
                setNewSupplier({
                    Name: '',
                    ContactName: '',
                    PhoneNumber: '',
                    Email: ''
                });
                fetchSuppliers();
            })
            .catch(error => {
                console.error('There was an error adding the supplier!', error);
            });
    };

    const handleUpdateSupplier = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/suppliers/${updateSupplier.SupplierID}`, updateSupplier)
            .then(response => {
                alert('Supplier updated successfully!');
                setUpdateSupplier({
                    SupplierID: '',
                    Name: '',
                    ContactName: '',
                    PhoneNumber: '',
                    Email: ''
                });
                fetchSuppliers();
            })
            .catch(error => {
                console.error('There was an error updating the supplier!', error);
            });
    };

    const handleDeleteSupplier = (id) => {
        axios.delete(`http://localhost:5000/suppliers/${id}`)
            .then(response => {
                alert('Supplier deleted successfully!');
                fetchSuppliers();
            })
            .catch(error => {
                console.error('There was an error deleting the supplier!', error);
            });
    };

    return (
        <div>
            <h2>Supplier Management</h2>
            <Row>
                <Col>
                    <h3>Add Supplier</h3>
                    <Form onSubmit={handleAddSupplier}>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                value={newSupplier.Name}
                                onChange={handleNewSupplierChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="ContactName">
                            <Form.Label>Contact Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="ContactName"
                                value={newSupplier.ContactName}
                                onChange={handleNewSupplierChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="PhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="PhoneNumber"
                                value={newSupplier.PhoneNumber}
                                onChange={handleNewSupplierChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="Email"
                                value={newSupplier.Email}
                                onChange={handleNewSupplierChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Supplier</Button>
                    </Form>
                </Col>
                <Col>
                    <h3>Update Supplier</h3>
                    <Form onSubmit={handleUpdateSupplier}>
                        <Form.Group controlId="SupplierID">
                            <Form.Label>Supplier ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="SupplierID"
                                value={updateSupplier.SupplierID}
                                onChange={handleUpdateSupplierChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                value={updateSupplier.Name}
                                onChange={handleUpdateSupplierChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="ContactName">
                            <Form.Label>Contact Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="ContactName"
                                value={updateSupplier.ContactName}
                                onChange={handleUpdateSupplierChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="PhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="PhoneNumber"
                                value={updateSupplier.PhoneNumber}
                                onChange={handleUpdateSupplierChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="Email"
                                value={updateSupplier.Email}
                                onChange={handleUpdateSupplierChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update Supplier</Button>
                    </Form>
                </Col>
            </Row>
            <h3>Suppliers</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.SupplierID}>
                            <td>{supplier.SupplierID}</td>
                            <td>{supplier.Name}</td>
                            <td>{supplier.ContactName}</td>
                            <td>{supplier.PhoneNumber}</td>
                            <td>{supplier.Email}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteSupplier(supplier.SupplierID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default SupplierManagement;
