const express = require('express');
const CarModel = require('../models/Car');

const app = express();
app.use(express.json());

const getAllcars = async (req, res) => {
    try {
        const cars = await CarModel.find({});
        res.status(200).send(cars);
    } catch (error) {
        res.status(500).send(error);
    }
}

const createCar = async (req, res) => {
    try {
        const newCar = req.body;
        const car = await CarModel.create(newCar);
        if (car) {
            res.status(201).send(car);
        } else {
            res.status(400).send("failed to create!!")
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateCar = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCarDetails = req.body;
        const updatedCar = await CarModel.findByIdAndUpdate(id, updatedCarDetails, {
            new: true,
            runValidators: true
        });

        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json(updatedCar);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteCar = async (req, res) => {
    try {
        const car = await CarModel.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getAllcars, createCar, deleteCar, updateCar }