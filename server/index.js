const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const ClientModel = require('./models/Clients')
const carRouter = require('./routes/carRoute')
const MongoStore = require('connect-mongo');
const session = require('express-session');
const key = 'dfgbnsthgse34g';

const PORT = 3001;
const DB = 'mongodb+srv://sourabh2112:Sk%4012344321@cluster0.itsazuw.mongodb.net/Cars?retryWrites=true&w=majority&appName=Cluster0';


const app = express()
app.use(express.json())
app.use(cors({
    origin: 'https://assignment-car-f4hl.vercel.app', // Adjust to your front-end origin
    credentials: true
}));


// Configure session middleware
app.use(session({
    secret: key,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
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

app.post("/register", async (req, res) => {
    const { email, ...otherData } = req.body;

    // Check if email is provided
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Check if the email already exists
        const existingClient = await ClientModel.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create new client
        const newClient = await ClientModel.create({ email, ...otherData });
        res.status(201).json(newClient);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});


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

mongoose.connect(DB)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

