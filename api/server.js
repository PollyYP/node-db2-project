// DO YOUR MAGIC
const router = require("express").Router();
const db = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allCars = await db.getAll();
    res.status(200).json(allCars);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.carID);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await db.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
