const db = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const carID = await db.getById(id);
    if (!carID) {
      res.status(404).json({ message: `car with id ${carID} is not found` });
    } else {
      req.carID = carID;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const vin = req.body.vin;
  const make = req.body.make;
  const model = req.body.model;
  const mileage = req.body.mileage;
  console.log(req.body);

  if (!vin || !make || !model || !mileage) {
    return res
      .status(400)
      .json({ message: "vin, make, model or mileage is missing" });
  }
  next();
};

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);

  if (!isValidVin) {
    return res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  }
  next();
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const allCars = await db.getAll();
    allCars.map((car) => {
      if (car.vin === req.body.vin) {
        res.status(400).json({ message: `vin ${req.body.vin} already exists` });
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
