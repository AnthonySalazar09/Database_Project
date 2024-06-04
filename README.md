# Product Management System

## Project Overview

The Product Management System is a web application designed to manage suppliers, customers, products, orders, order details, and inventory restocks efficiently. The application uses a Python Flask API for the backend and React for the frontend, providing a robust and scalable solution for product management.

## Table of Contents

- [Project Overview](#project-overview)
- [Backend (API) Overview](#backend-api-overview)
  - [API Endpoints](#api-endpoints)
- [Frontend (React) Overview](#frontend-react-overview)
  - [Components](#components)
  - [Styling](#styling)
- [Setup and Installation](#setup-and-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Contributing](#contributing)
- [License](#license)

## Backend (API) Overview

The backend of the Product Management System is built using Flask, a lightweight WSGI web application framework for Python. The API interacts with a relational database to perform CRUD operations on various entities such as suppliers, customers, products, orders, order details, and inventory restocks.

### API Endpoints

Below are the main API endpoints provided by the Flask backend:

- **Suppliers**
  - `GET /suppliers`: Retrieve a list of all suppliers.
  - `POST /suppliers`: Add a new supplier.
  - `PUT /suppliers/<id>`: Update an existing supplier.
  - `DELETE /suppliers/<id>`: Delete a supplier.

- **Customers**
  - `GET /customers`: Retrieve a list of all customers.
  - `POST /customers`: Add a new customer.
  - `PUT /customers/<id>`: Update an existing customer.
  - `DELETE /customers/<id>`: Delete a customer.

- **Products**
  - `GET /products`: Retrieve a list of all products.
  - `POST /products`: Add a new product.
  - `PUT /products/<id>`: Update an existing product.
  - `DELETE /products/<id>`: Delete a product.

- **Orders**
  - `GET /orders`: Retrieve a list of all orders.
  - `POST /orders`: Add a new order.
  - `PUT /orders/<id>`: Update an existing order.
  - `DELETE /orders/<id>`: Delete an order.

- **Order Details**
  - `GET /orderdetails`: Retrieve a list of all order details.
  - `POST /orderdetails`: Add a new order detail.
  - `PUT /orderdetails/<id>`: Update an existing order detail.
  - `DELETE /orderdetails/<id>`: Delete an order detail.

- **Inventory Restocks**
  - `GET /inventoryrestocks`: Retrieve a list of all inventory restocks.
  - `POST /inventoryrestocks`: Add a new inventory restock.
  - `PUT /inventoryrestocks/<id>`: Update an existing inventory restock.
  - `DELETE /inventoryrestocks/<id>`: Delete an inventory restock.

## Frontend (React) Overview

The frontend of the Product Management System is built using React, a JavaScript library for building user interfaces. The application consists of several components, each responsible for managing a different aspect of the system.

### Components

- **Dashboard**
  - Displays a welcome message and an overview of the system.
  
- **SupplierManagement**
  - Manages the suppliers in the system, allowing for the creation, update, and deletion of suppliers.

- **CustomerManagement**
  - Manages the customers in the system, allowing for the creation, update, and deletion of customers.

- **ProductManagement**
  - Manages the products in the system, allowing for the creation, update, and deletion of products.

- **OrderManagement**
  - Manages the orders in the system, allowing for the creation, update, and deletion of orders.

- **OrderDetailManagement**
  - Manages the order details in the system, allowing for the creation, update, and deletion of order details.

- **InventoryRestockManagement**
  - Manages the inventory restocks in the system, allowing for the creation, update, and deletion of inventory restocks.

### Styling

The application uses Bootstrap for basic styling and layout, ensuring a responsive and visually appealing interface. Custom CSS is also used to enhance the appearance of individual components.

## Setup and Installation

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AnthonySalazar09/Database_Project.git
   cd Database_Project
