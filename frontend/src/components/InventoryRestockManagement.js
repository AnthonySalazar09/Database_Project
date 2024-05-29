import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

const InventoryRestockManagement = () => {
    const [inventoryRestocks, setInventoryRestocks] = useState([]);
    const [newInventoryRestock, setNewInventoryRestock] = useState({
        ProductID: '',
        Quantity: '',
        RestockDate: ''
    });
    const [updateInventoryRestock, setUpdateInventoryRestock] = useState({
        InventoryRestockID: '',
        ProductID: '',
        Quantity: '',
        RestockDate: ''
    });

    useEffect(() => {
        fetchInventoryRestocks();
    }, []);

    const fetchInventoryRestocks = () => {
        axios.get('http://localhost:5000/inventoryrestocks')
            .then(response => {
                setInventoryRestocks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the inventory restocks!', error);
            });
    };

    const handleNewInventoryRestockChange = (e) => {
        const { name, value } = e.target;
        setNewInventoryRestock({ ...newInventoryRestock, [name]: value });
    };

    const handleUpdateInventoryRestockChange = (e) => {
        const { name, value } = e.target;
        setUpdateInventoryRestock({ ...updateInventoryRestock, [name]: value });
    };

    const handleAddInventoryRestock = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/inventoryrestocks', newInventoryRestock)
            .then(response => {
                alert('Inventory Restock added successfully!');
                setNewInventoryRestock({
                    ProductID: '',
                    Quantity: '',
                    RestockDate: ''
                });
                fetchInventoryRestocks();
            })
            .catch(error => {
                console.error('There was an error adding the inventory restock!', error);
            });
    };

    const handleUpdateInventoryRestock = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/inventoryrestocks/${updateInventoryRestock.InventoryRestockID}`, updateInventoryRestock)
            .then(response => {
                alert('Inventory Restock updated successfully!');
                setUpdateInventoryRestock({
                    InventoryRestockID: '',
                    ProductID: '',
                    Quantity: '',
                    RestockDate: ''
                });
                fetchInventoryRestocks();
            })
            .catch(error => {
                console.error('There was an error updating the inventory restock!', error);
            });
    };

    const handleDeleteInventoryRestock = (id) => {
        axios.delete(`http://localhost:5000/inventoryrestocks/${id}`)
            .then(response => {
                alert('Inventory Restock deleted successfully!');
                fetchInventoryRestocks();
            })
            .catch(error => {
                console.error('There was an error deleting the inventory restock!', error);
            });
    };

    return (
        <div>
            <h2>Inventory Restock Management</h2>
            <Row>
                <Col>
                    <h3>Add Inventory Restock</h3>
                    <Form onSubmit={handleAddInventoryRestock}>
                        <Form.Group controlId="ProductID">
                            <Form.Label>Product ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="ProductID"
                                value={newInventoryRestock.ProductID}
                                onChange={handleNewInventoryRestockChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="Quantity"
                                value={newInventoryRestock.Quantity}
                                onChange={handleNewInventoryRestockChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="RestockDate">
                            <Form.Label>Restock Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="RestockDate"
                                value={newInventoryRestock.RestockDate}
                                onChange={handleNewInventoryRestockChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Inventory Restock</Button>
                    </Form>
                </Col>
                <Col>
                    <h3>Update Inventory Restock</h3>
                    <Form onSubmit={handleUpdateInventoryRestock}>
                        <Form.Group controlId="InventoryRestockID">
                            <Form.Label>Inventory Restock ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="InventoryRestockID"
                                value={updateInventoryRestock.InventoryRestockID}
                                onChange={handleUpdateInventoryRestockChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="ProductID">
                            <Form.Label>Product ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="ProductID"
                                value={updateInventoryRestock.ProductID}
                                onChange={handleUpdateInventoryRestockChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="Quantity"
                                value={updateInventoryRestock.Quantity}
                                onChange={handleUpdateInventoryRestockChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="RestockDate">
                            <Form.Label>Restock Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="RestockDate"
                                value={updateInventoryRestock.RestockDate}
                                onChange={handleUpdateInventoryRestockChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update Inventory Restock</Button>
                    </Form>
                </Col>
            </Row>
            <h3>Inventory Restocks</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Restock Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryRestocks.map(restock => (
                        <tr key={restock.InventoryRestockID}>
                            <td>{restock.InventoryRestockID}</td>
                            <td>{restock.ProductID}</td>
                            <td>{restock.Quantity}</td>
                            <td>{restock.RestockDate}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteInventoryRestock(restock.InventoryRestockID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default InventoryRestockManagement;
