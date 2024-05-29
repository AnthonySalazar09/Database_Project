import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SupplierManagement from './components/SupplierManagement';
import CustomerManagement from './components/CustomerManagement';
import ProductManagement from './components/ProductManagement';
import OrderManagement from './components/OrderManagement';
import OrderDetailManagement from './components/OrderDetailManagement';
import InventoryRestockManagement from './components/InventoryRestockManagement';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/suppliers" element={<SupplierManagement />} />
                    <Route path="/customers" element={<CustomerManagement />} />
                    <Route path="/products" element={<ProductManagement />} />
                    <Route path="/orders" element={<OrderManagement />} />
                    <Route path="/orderdetails" element={<OrderDetailManagement />} />
                    <Route path="/inventoryrestocks" element={<InventoryRestockManagement />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;



