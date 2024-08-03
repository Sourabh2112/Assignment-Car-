const express = require("express");
const { getAllcars, createCar, updateCar, deleteCar } = require('../controller/carController');

const router = express.Router();

router.get("/cars", getAllcars);
router.post("/cars", createCar);
router.put("/cars/:id", updateCar);
router.delete("/cars/:id", deleteCar);

module.exports = router;