import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

const OrderDetailManagement = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [products, setProducts] = useState([]);
    const [newOrderDetail, setNewOrderDetail] = useState({
        OrderID: '',
        ProductID: '',
        Quantity: ''
    });
    const [updateOrderDetail, setUpdateOrderDetail] = useState({
        OrderDetailID: '',
        OrderID: '',
        ProductID: '',
        Quantity: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrderDetails();
        fetchProducts();
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

    const fetchProducts = () => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
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
                    Quantity: ''
                });
                setError('');
                fetchOrderDetails();
            })
            .catch(error => {
                console.error('There was an error adding the order detail!', error);
                setError(error.response.data.error);
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
                    Quantity: ''
                });
                setError('');
                fetchOrderDetails();
            })
            .catch(error => {
                console.error('There was an error updating the order detail!', error);
                setError(error.response.data.error);
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                                as="select"
                                name="ProductID"
                                value={newOrderDetail.ProductID}
                                onChange={handleNewOrderDetailChange}
                                required
                            >
                                <option value="">Select a product</option>
                                {products.map(product => (
                                    <option key={product.ProductID} value={product.ProductID}>
                                        {product.Name} (Stock: {product.QuantityInStock})
                                    </option>
                                ))}
                            </Form.Control>
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
                                as="select"
                                name="ProductID"
                                value={updateOrderDetail.ProductID}
                                onChange={handleUpdateOrderDetailChange}
                                required
                            >
                                <option value="">Select a product</option>
                                {products.map(product => (
                                    <option key={product.ProductID} value={product.ProductID}>
                                        {product.Name} (Stock: {product.QuantityInStock})
                                    </option>
                                ))}
                            </Form.Control>
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
                        <th>Price</th>
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
                            <td>{orderDetail.Price}</td>
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

