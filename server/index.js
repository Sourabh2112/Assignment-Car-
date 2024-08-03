const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const ClientModel = require('./models/Clients')
const carRouter = require('./routes/carRoute')
const MongoStore = require('connect-mongo');
const session = require('express-session');
const key = 'dfgbnsthgse34g';

const PORT = 3001;


const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Adjust to your front-end origin
    credentials: true
}));


// Configure session middleware
app.use(session({
    secret: key,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 // Session duration
    }
}));
// app.use(logSessionMiddleware);

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "Access denied. Please log in." });
    }
};

const logSessionMiddleware = (req, res, next) => {
    console.log('Session:', req.session);
    next();
};

app.post("/register", (req, res) => {
    const data = req.body;
    ClientModel.create(data)
        .then(client => res.json(client))
        .catch(err => res.json(err))
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Enter the Credentials..." });
    }

    try {
        const user = await ClientModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Password incorrect!!!" });
        }

        req.session.user = user;
        res.status(200).json({ message: "Success", role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

// Logout endpoint
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Unable to log out" });
        } else {
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.status(200).json({ message: "Logout successful" });
        }
    });
});

app.use("/api", isAuthenticated, carRouter);

mongoose.connect("mongodb://127.0.0.1:27017/Cars")
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

