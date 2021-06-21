const express = require("express");
const carsRouter = require("./cars/cars-router");
const server = express();

// DO YOUR MAGIC

server.use(express.json());
server.use("/api/cars", carsRouter);

server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
