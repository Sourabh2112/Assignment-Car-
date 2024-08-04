const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const ClientModel = require('./models/Clients')
const carRouter = require('./routes/carRoute')
const MongoStore = require('connect-mongo');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const key = 'dfgbnsthgse34g';

const PORT = 3001;
const DB = 'mongodb+srv://sourabh2112:Sk%4012344321@cluster0.itsazuw.mongodb.net/Cars?retryWrites=true&w=majority&appName=Cluster0';
// const DB = 'mongodb://localhost:27017/Cars'

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'https://assignment-car-f4hl.vercel.app', // Adjust to your front-end origin
    credentials: true
}));

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {

    // console.log(req.cookies);
    const { token } = req.cookies;

    try {
        if (!token) {
            res.status(403).send('please login first');
        }
        jwt.verify(token, 'sourabh');
        // console.log(decode);
        next();
    } catch (error) {
        console.log(error);
        res.status(404).send('Invalide token');
    }
};

app.post("/register", async (req, res) => {
    const { email, password, role, name } = req.body; // Extract email and password from the body

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Check if the email already exists
        const existingClient = await ClientModel.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create new client
        const newClient = await ClientModel.create({ email, password, role, name });

        res.status(201).json(newClient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // console.log(email);
    if (!email && !password) {
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

        const token = jwt.sign(
            {
                id: user._id,
                email
            },
            'sourabh', //secret
            {
                expiresIn: "1h"
            }
        );
        user.token = token;

        const options = {
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user,
            role: user.role
        })
        // req.session.user = user;
        // res.status(200).json({ message: "Success", role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

// Logout endpoint
app.post("/logout", (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
    res.status(200).json({ message: "Logout successful" });
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

