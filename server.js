const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Sample data
const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
];

const orders = [
    { id: 101, userId: 1, product: "Laptop", status: "COMPLETED" },
    { id: 102, userId: 2, product: "Phone", status: "PROCESSING" }
];

const products = [
    { id: 1, name: "Laptop", price: 75000 },
    { id: 2, name: "Phone", price: 40000 }
];


// --------------------------------------------------
// Health
// --------------------------------------------------

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        service: "Agent Demo API"
    });
});


// --------------------------------------------------
// Users
// --------------------------------------------------

app.get("/api/users", (req, res) => {
    res.json(users);
});


app.get("/api/users/:id", (req, res) => {
    const user = users.find(
        user => user.id === Number(req.params.id)
    );

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    res.json(user);
});


app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json(newUser);
});


// --------------------------------------------------
// Orders
// --------------------------------------------------

app.get("/api/orders", (req, res) => {
    res.json(orders);
});


app.get("/api/orders/:id", (req, res) => {
    const order = orders.find(
        order => order.id === Number(req.params.id)
    );

    if (!order) {
        return res.status(404).json({
            error: "Order not found"
        });
    }

    res.json(order);
});


app.post("/api/orders", (req, res) => {
    const { userId, product } = req.body;

    if (!userId || !product) {
        return res.status(400).json({
            error: "userId and product are required"
        });
    }

    const newOrder = {
        id: orders.length + 101,
        userId,
        product,
        status: "PROCESSING"
    };

    orders.push(newOrder);

    res.status(201).json(newOrder);
});


// --------------------------------------------------
// Products
// --------------------------------------------------

app.get("/api/products", (req, res) => {
    res.json(products);
});


// --------------------------------------------------
// Simulated error
// --------------------------------------------------

app.get("/api/simulate-error", (req, res) => {
    res.status(500).json({
        error: "Simulated internal server error"
    });
});


// --------------------------------------------------
// Start server
// --------------------------------------------------

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Agent Demo API running on port ${PORT}`);
});