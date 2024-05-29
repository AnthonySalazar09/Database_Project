import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        Name: '',
        Category: '',
        Price: '',
        QuantityInStock: '',
        SupplierID: ''
    });
    const [updateProduct, setUpdateProduct] = useState({
        ProductID: '',
        Name: '',
        Category: '',
        Price: '',
        QuantityInStock: '',
        SupplierID: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    };

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleUpdateProductChange = (e) => {
        const { name, value } = e.target;
        setUpdateProduct({ ...updateProduct, [name]: value });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/products', newProduct)
            .then(response => {
                alert('Product added successfully!');
                setNewProduct({
                    Name: '',
                    Category: '',
                    Price: '',
                    QuantityInStock: '',
                    SupplierID: ''
                });
                fetchProducts();
            })
            .catch(error => {
                console.error('There was an error adding the product!', error);
            });
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/products/${updateProduct.ProductID}`, updateProduct)
            .then(response => {
                alert('Product updated successfully!');
                setUpdateProduct({
                    ProductID: '',
                    Name: '',
                    Category: '',
                    Price: '',
                    QuantityInStock: '',
                    SupplierID: ''
                });
                fetchProducts();
            })
            .catch(error => {
                console.error('There was an error updating the product!', error);
            });
    };

    const handleDeleteProduct = (id) => {
        axios.delete(`http://localhost:5000/products/${id}`)
            .then(response => {
                alert('Product deleted successfully!');
                fetchProducts();
            })
            .catch(error => {
                console.error('There was an error deleting the product!', error);
            });
    };

    return (
        <div>
            <h2>Product Management</h2>
            <Row>
                <Col>
                    <h3>Add Product</h3>
                    <Form onSubmit={handleAddProduct}>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                value={newProduct.Name}
                                onChange={handleNewProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="Category"
                                value={newProduct.Category}
                                onChange={handleNewProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="Price"
                                value={newProduct.Price}
                                onChange={handleNewProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="QuantityInStock">
                            <Form.Label>Quantity In Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="QuantityInStock"
                                value={newProduct.QuantityInStock}
                                onChange={handleNewProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="SupplierID">
                            <Form.Label>Supplier ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="SupplierID"
                                value={newProduct.SupplierID}
                                onChange={handleNewProductChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Product</Button>
                    </Form>
                </Col>
                <Col>
                    <h3>Update Product</h3>
                    <Form onSubmit={handleUpdateProduct}>
                        <Form.Group controlId="ProductID">
                            <Form.Label>Product ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="ProductID"
                                value={updateProduct.ProductID}
                                onChange={handleUpdateProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                value={updateProduct.Name}
                                onChange={handleUpdateProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="Category"
                                value={updateProduct.Category}
                                onChange={handleUpdateProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="Price"
                                value={updateProduct.Price}
                                onChange={handleUpdateProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="QuantityInStock">
                            <Form.Label>Quantity In Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="QuantityInStock"
                                value={updateProduct.QuantityInStock}
                                onChange={handleUpdateProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="SupplierID">
                            <Form.Label>Supplier ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="SupplierID"
                                value={updateProduct.SupplierID}
                                onChange={handleUpdateProductChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update Product</Button>
                    </Form>
                </Col>
            </Row>
            <h3>Products</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity In Stock</th>
                        <th>Supplier ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.ProductID}>
                            <td>{product.ProductID}</td>
                            <td>{product.Name}</td>
                            <td>{product.Category}</td>
                            <td>{product.Price}</td>
                            <td>{product.QuantityInStock}</td>
                            <td>{product.SupplierID}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteProduct(product.ProductID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductManagement;
