import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        CustomerID: '',
        OrderDate: ''
    });
    const [updateOrder, setUpdateOrder] = useState({
        OrderID: '',
        CustomerID: '',
        OrderDate: ''
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get('http://localhost:5000/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the orders!', error);
            });
    };

    const handleNewOrderChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleUpdateOrderChange = (e) => {
        const { name, value } = e.target;
        setUpdateOrder({ ...updateOrder, [name]: value });
    };

    const handleAddOrder = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/orders', newOrder)
            .then(response => {
                alert('Order added successfully!');
                setNewOrder({
                    CustomerID: '',
                    OrderDate: ''
                });
                fetchOrders();
            })
            .catch(error => {
                console.error('There was an error adding the order!', error);
            });
    };

    const handleUpdateOrder = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/orders/${updateOrder.OrderID}`, updateOrder)
            .then(response => {
                alert('Order updated successfully!');
                setUpdateOrder({
                    OrderID: '',
                    CustomerID: '',
                    OrderDate: ''
                });
                fetchOrders();
            })
            .catch(error => {
                console.error('There was an error updating the order!', error);
            });
    };

    const handleDeleteOrder = (id) => {
        axios.delete(`http://localhost:5000/orders/${id}`)
            .then(response => {
                alert('Order deleted successfully!');
                fetchOrders();
            })
            .catch(error => {
                console.error('There was an error deleting the order!', error);
            });
    };

    return (
        <div>
            <h2>Order Management</h2>
            <Row>
                <Col>
                    <h3>Add Order</h3>
                    <Form onSubmit={handleAddOrder}>
                        <Form.Group controlId="CustomerID">
                            <Form.Label>Customer ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="CustomerID"
                                value={newOrder.CustomerID}
                                onChange={handleNewOrderChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="OrderDate">
                            <Form.Label>Order Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="OrderDate"
                                value={newOrder.OrderDate}
                                onChange={handleNewOrderChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Order</Button>
                    </Form>
                </Col>
                <Col>
                    <h3>Update Order</h3>
                    <Form onSubmit={handleUpdateOrder}>
                        <Form.Group controlId="OrderID">
                            <Form.Label>Order ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="OrderID"
                                value={updateOrder.OrderID}
                                onChange={handleUpdateOrderChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="CustomerID">
                            <Form.Label>Customer ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="CustomerID"
                                value={updateOrder.CustomerID}
                                onChange={handleUpdateOrderChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="OrderDate">
                            <Form.Label>Order Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="OrderDate"
                                value={updateOrder.OrderDate}
                                onChange={handleUpdateOrderChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update Order</Button>
                    </Form>
                </Col>
            </Row>
            <h3>Orders</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer ID</th>
                        <th>Order Date</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.OrderID}>
                            <td>{order.OrderID}</td>
                            <td>{order.CustomerID}</td>
                            <td>{order.OrderDate}</td>
                            <td>{order.TotalAmount}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteOrder(order.OrderID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default OrderManagement;
