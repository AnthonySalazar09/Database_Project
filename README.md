# Product Management System

## Project Overview

The Product Management System is a web application designed to manage suppliers, customers, products, orders, order details, and inventory restocks efficiently. The application uses a Python Flask API for the backend and React for the frontend, providing a robust and scalable solution for product management.

## Table of Contents

- [Project Overview](#project-overview)
- [Backend (API) Overview](#backend-api-overview)
  - [API Endpoints](#api-endpoints)
  - [Stock Management](#stock-management)
- [Frontend (React) Overview](#frontend-react-overview)
  - [Components](#components)
  - [Styling](#styling)
- [Setup and Installation](#setup-and-installation)

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

### Stock Management

The system includes functionality to manage stock levels effectively:
- **Decrease `QuantityInStock`**: When an order detail is added or updated, the system decreases the product's `QuantityInStock` accordingly.
- **Increase `QuantityInStock`**: When an order detail is deleted, the system increases the product's `QuantityInStock`.
- **Error Handling**: The system ensures there is sufficient stock available before adding or updating order details and provides appropriate error messages if not.

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
  - Manages the order details in the system, allowing for the creation, update, and deletion of order details. It also ensures that product stock levels are updated accordingly.

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
2. **Create a Virtual Environment**
   ```bash
   python -m venv venv

3. **Activate the Virtual Environment**
   On Windows:
   ```bash
    venv\Scripts\activate
4. Set Up the Database:
   Ensure MySQL is installed and running on your system.
   Create a database named projectdb in MySQL.
   Update the database connection string in the app.py file if necessary.
5. Initialize the Database:
  Run the following commands to create and migrate the database schema:
    ```bash
    flask db init
    flask db migrate -m "Initial migration."
    flask db upgrade

6. Run the Backend Server:
    Run the following command:
    ```bash
    flask run

###Frontend Setup

1. Navigate to the Frontend Directory:
In the terminal or command prompt, run the following command:

    ```bash
    cd frontend
2. Install Frontend Dependencies:
Run the following command:

    ```bash
    npm install
3. Start the React Development Server:
Run the following command:

    ```bash
    npm start
4. Access the Application:
Open a web browser and navigate to http://localhost:3000.


