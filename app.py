from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:esponjaxd@/projectdb'
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Models
class Supplier(db.Model):
    SupplierID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100))
    ContactName = db.Column(db.String(100))
    PhoneNumber = db.Column(db.String(100))
    Email = db.Column(db.String(100))

class Customer(db.Model):
    CustomerID = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String(100))
    LastName = db.Column(db.String(100))
    Email = db.Column(db.String(100))
    PhoneNumber = db.Column(db.String(100))

class Product(db.Model):
    ProductID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100))
    Category = db.Column(db.String(100))
    Price = db.Column(db.Float)
    QuantityInStock = db.Column(db.Integer)
    SupplierID = db.Column(db.Integer, db.ForeignKey('supplier.SupplierID'))

class Order(db.Model):
    OrderID = db.Column(db.Integer, primary_key=True)
    CustomerID = db.Column(db.Integer, db.ForeignKey('customer.CustomerID'))
    OrderDate = db.Column(db.Date)
    TotalAmount = db.Column(db.Float)

class OrderDetail(db.Model):
    OrderDetailID = db.Column(db.Integer, primary_key=True)
    OrderID = db.Column(db.Integer, db.ForeignKey('order.OrderID'))
    ProductID = db.Column(db.Integer, db.ForeignKey('product.ProductID'))
    Quantity = db.Column(db.Integer)
    Price = db.Column(db.Float)

class InventoryRestock(db.Model):
    InventoryRestockID = db.Column(db.Integer, primary_key=True)
    ProductID = db.Column(db.Integer, db.ForeignKey('product.ProductID'))
    Quantity = db.Column(db.Integer)
    RestockDate = db.Column(db.Date)

# Schemas
class SupplierSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Supplier
        include_fk = True

class CustomerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Customer
        include_fk = True

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product
        include_fk = True

class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        include_fk = True

class OrderDetailSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = OrderDetail
        include_fk = True

class InventoryRestockSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = InventoryRestock
        include_fk = True

supplier_schema = SupplierSchema()
suppliers_schema = SupplierSchema(many=True)

customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

order_detail_schema = OrderDetailSchema()
order_details_schema = OrderDetailSchema(many=True)

inventory_restock_schema = InventoryRestockSchema()
inventory_restocks_schema = InventoryRestockSchema(many=True)

# Routes
@app.route('/suppliers', methods=['POST'])
def add_supplier():
    data = request.json
    new_supplier = Supplier(
        Name=data['Name'],
        ContactName=data['ContactName'],
        PhoneNumber=data['PhoneNumber'],
        Email=data['Email']
    )
    db.session.add(new_supplier)
    db.session.commit()
    return supplier_schema.jsonify(new_supplier)

@app.route('/suppliers/<int:id>', methods=['PUT'])
def update_supplier(id):
    data = request.json
    supplier = db.session.get(Supplier, id)
    if not supplier:
        return jsonify({"error": "Supplier not found"}), 404

    supplier.Name = data['Name']
    supplier.ContactName = data['ContactName']
    supplier.PhoneNumber = data['PhoneNumber']
    supplier.Email = data['Email']
    db.session.commit()
    return supplier_schema.jsonify(supplier)

@app.route('/suppliers', methods=['GET'])
def get_suppliers():
    suppliers = Supplier.query.all()
    return suppliers_schema.jsonify(suppliers)

@app.route('/suppliers/<int:id>', methods=['DELETE'])
def delete_supplier(id):
    supplier = db.session.get(Supplier, id)
    if not supplier:
        return jsonify({"error": "Supplier not found"}), 404

    db.session.delete(supplier)
    db.session.commit()
    return supplier_schema.jsonify(supplier)

@app.route('/customers', methods=['POST'])
def add_customer():
    data = request.json
    new_customer = Customer(
        FirstName=data['FirstName'],
        LastName=data['LastName'],
        Email=data['Email'],
        PhoneNumber=data['PhoneNumber']
    )
    db.session.add(new_customer)
    db.session.commit()
    return customer_schema.jsonify(new_customer)

@app.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    data = request.json
    customer = db.session.get(Customer, id)
    if not customer:
        return jsonify({"error": "Customer not found"}), 404

    customer.FirstName = data['FirstName']
    customer.LastName = data['LastName']
    customer.Email = data['Email']
    customer.PhoneNumber = data['PhoneNumber']
    db.session.commit()
    return customer_schema.jsonify(customer)

@app.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return customers_schema.jsonify(customers)

@app.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = db.session.get(Customer, id)
    if not customer:
        return jsonify({"error": "Customer not found"}), 404

    db.session.delete(customer)
    db.session.commit()
    return customer_schema.jsonify(customer)

@app.route('/products', methods=['POST'])
def add_product():
    data = request.json
    new_product = Product(
        Name=data['Name'],
        Category=data['Category'],
        Price=data['Price'],
        QuantityInStock=data['QuantityInStock'],
        SupplierID=data['SupplierID']
    )
    db.session.add(new_product)
    db.session.commit()
    return product_schema.jsonify(new_product)

@app.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.json
    product = db.session.get(Product, id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    product.Name = data['Name']
    product.Category = data['Category']
    product.Price = data['Price']
    product.QuantityInStock = data['QuantityInStock']
    product.SupplierID = data['SupplierID']
    db.session.commit()
    return product_schema.jsonify(product)

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return products_schema.jsonify(products)

@app.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = db.session.get(Product, id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()
    return product_schema.jsonify(product)

@app.route('/orders', methods=['POST'])
def add_order():
    data = request.json
    new_order = Order(
        CustomerID=data['CustomerID'],
        OrderDate=datetime.strptime(data['OrderDate'], '%Y-%m-%d').date(),
        TotalAmount=data['TotalAmount']
    )
    db.session.add(new_order)
    db.session.commit()
    return order_schema.jsonify(new_order)

@app.route('/orders/<int:id>', methods=['PUT'])
def update_order(id):
    data = request.json
    order = db.session.get(Order, id)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    order.CustomerID = data['CustomerID']
    order.OrderDate = datetime.strptime(data['OrderDate'], '%Y-%m-%d').date()
    order.TotalAmount = data['TotalAmount']
    db.session.commit()
    return order_schema.jsonify(order)

@app.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return orders_schema.jsonify(orders)

@app.route('/orders/<int:id>', methods=['DELETE'])
def delete_order(id):
    order = db.session.get(Order, id)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    db.session.delete(order)
    db.session.commit()
    return order_schema.jsonify(order)

@app.route('/orderdetails', methods=['POST'])
def add_order_detail():
    data = request.json
    product = db.session.get(Product, data['ProductID'])
    if not product:
        return jsonify({"error": "Product not found"}), 404

    new_order_detail = OrderDetail(
        OrderID=data['OrderID'],
        ProductID=data['ProductID'],
        Quantity=data['Quantity'],
        Price=product.Price  # Use the price from the Product table
    )
    db.session.add(new_order_detail)
    db.session.commit()
    return order_detail_schema.jsonify(new_order_detail)

@app.route('/orderdetails/<int:id>', methods=['PUT'])
def update_order_detail(id):
    data = request.json
    order_detail = db.session.get(OrderDetail, id)
    if not order_detail:
        return jsonify({"error": "OrderDetail not found"}), 404

    product = db.session.get(Product, data['ProductID'])
    if not product:
        return jsonify({"error": "Product not found"}), 404

    order_detail.OrderID = data['OrderID']
    order_detail.ProductID = data['ProductID']
    order_detail.Quantity = data['Quantity']
    order_detail.Price = product.Price  # Use the price from the Product table
    db.session.commit()
    return order_detail_schema.jsonify(order_detail)

@app.route('/orderdetails', methods=['GET'])
def get_order_details():
    order_details = OrderDetail.query.all()
    return order_details_schema.jsonify(order_details)

@app.route('/orderdetails/<int:id>', methods=['DELETE'])
def delete_order_detail(id):
    order_detail = db.session.get(OrderDetail, id)
    if not order_detail:
        return jsonify({"error": "OrderDetail not found"}), 404

    db.session.delete(order_detail)
    db.session.commit()
    return order_detail_schema.jsonify(order_detail)

@app.route('/inventoryrestocks', methods=['POST'])
def add_inventory_restock():
    data = request.json
    new_inventory_restock = InventoryRestock(
        ProductID=data['ProductID'],
        Quantity=data['Quantity'],
        RestockDate=datetime.strptime(data['RestockDate'], '%Y-%m-%d').date()
    )
    db.session.add(new_inventory_restock)
    db.session.commit()
    return inventory_restock_schema.jsonify(new_inventory_restock)

@app.route('/inventoryrestocks/<int:id>', methods=['PUT'])
def update_inventory_restock(id):
    data = request.json
    inventory_restock = db.session.get(InventoryRestock, id)
    if not inventory_restock:
        return jsonify({"error": "InventoryRestock not found"}), 404

    inventory_restock.ProductID = data['ProductID']
    inventory_restock.Quantity = data['Quantity']
    inventory_restock.RestockDate = datetime.strptime(data['RestockDate'], '%Y-%m-%d').date()
    db.session.commit()
    return inventory_restock_schema.jsonify(inventory_restock)

@app.route('/inventoryrestocks', methods=['GET'])
def get_inventory_restocks():
    inventory_restocks = InventoryRestock.query.all()
    return inventory_restocks_schema.jsonify(inventory_restocks)

@app.route('/inventoryrestocks/<int:id>', methods=['DELETE'])
def delete_inventory_restock(id):
    inventory_restock = db.session.get(InventoryRestock, id)
    if not inventory_restock:
        return jsonify({"error": "InventoryRestock not found"}), 404

    db.session.delete(inventory_restock)
    db.session.commit()
    return inventory_restock_schema.jsonify(inventory_restock)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
