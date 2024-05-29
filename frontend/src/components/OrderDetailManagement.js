import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

const OrderDetailManagement = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [newOrderDetail, setNewOrderDetail] = useState({
        OrderID: '',
        ProductID: '',
        Quantity: '',
        DetailDate: ''
    });
    const [updateOrderDetail, setUpdateOrderDetail] = useState({
        OrderDetailID: '',
        OrderID: '',
        ProductID: '',
        Quantity: '',
        DetailDate: ''
    });

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    const fetchOrderDetails = () => {
        axios.get('http://localhost:5000/orderdetails')
            .then(response => {
                setOrderDetails(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the order details!', error);
            });
    };

    const handleNewOrderDetailChange = (e) => {
        const { name, value } = e.target;
        setNewOrderDetail({ ...newOrderDetail, [name]: value });
    };

    const handleUpdateOrderDetailChange = (e) => {
        const { name, value } = e.target;
        setUpdateOrderDetail({ ...updateOrderDetail, [name]: value });
    };

    const handleAddOrderDetail = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/orderdetails', newOrderDetail)
            .then(response => {
                alert('Order Detail added successfully!');
                setNewOrderDetail({
                    OrderID: '',
                    ProductID: '',
                    Quantity: '',
                    DetailDate: ''
                });
                fetchOrderDetails();
            })
            .catch(error => {
                console.error('There was an error adding the order detail!', error);
            });
    };

    const handleUpdateOrderDetail = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/orderdetails/${updateOrderDetail.OrderDetailID}`, updateOrderDetail)
            .then(response => {
                alert('Order Detail updated successfully!');
                setUpdateOrderDetail({
                    OrderDetailID: '',
                    OrderID: '',
                    ProductID: '',
                    Quantity: '',
                    DetailDate: ''
                });
                fetchOrderDetails();
            })
            .catch(error => {
                console.error('There was an error updating the order detail!', error);
            });
    };

    const handleDeleteOrderDetail = (id) => {
        axios.delete(`http://localhost:5000/orderdetails/${id}`)
            .then(response => {
                alert('Order Detail deleted successfully!');
                fetchOrderDetails();
            })
            .catch(error => {
                console.error('There was an error deleting the order detail!', error);
            });
    };

    return (
        <div>
            <h2>Order Detail Management</h2>
            <Row>
                <Col>
                    <h3>Add Order Detail</h3>
                    <Form onSubmit={handleAddOrderDetail}>
                        <Form.Group controlId="OrderID">
                            <Form.Label>Order ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="OrderID"
                                value={newOrderDetail.OrderID}
                                onChange={handleNewOrderDetailChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="ProductID">
                            <Form.Label>Product ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="ProductID"
                                value={newOrderDetail.ProductID}
                                onChange={handleNewOrderDetailChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="Quantity"
                                value={newOrderDetail.Quantity}
                                onChange={handleNewOrderDetailChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="DetailDate">
                            <Form.Label>Detail Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="DetailDate"
                                value={newOrderDetail.DetailDate}
                                onChange={handleNewOrderDetailChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Order Detail</Button>
                    </Form>
                </Col>
                <Col>
                    <h3>Update Order Detail</h3>
                    <Form onSubmit={handleUpdateOrderDetail}>
                        <Form.Group controlId="OrderDetailID">
                            <Form.Label>Order Detail ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="OrderDetailID"
                                value={updateOrderDetail.OrderDetailID}
                                onChange={handleUpdateOrderDetailChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="OrderID">
                            <Form.Label>Order ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="OrderID"
                                value={updateOrderDetail.OrderID}
                                onChange={handleUpdateOrderDetailChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="ProductID">
                            <Form.Label>Product ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="ProductID"
                                value={updateOrderDetail.ProductID}
                                onChange={handleUpdateOrderDetailChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="Quantity"
                                value={updateOrderDetail.Quantity}
                                onChange={handleUpdateOrderDetailChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="DetailDate">
                            <Form.Label>Detail Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="DetailDate"
                                value={updateOrderDetail.DetailDate}
                                onChange={handleUpdateOrderDetailChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update Order Detail</Button>
                    </Form>
                </Col>
            </Row>
            <h3>Order Details</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Detail Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.map(orderDetail => (
                        <tr key={orderDetail.OrderDetailID}>
                            <td>{orderDetail.OrderDetailID}</td>
                            <td>{orderDetail.OrderID}</td>
                            <td>{orderDetail.ProductID}</td>
                            <td>{orderDetail.Quantity}</td>
                            <td>{orderDetail.DetailDate}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteOrderDetail(orderDetail.OrderDetailID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default OrderDetailManagement;
