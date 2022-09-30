const express = require("express");
const router = express.Router();
const PokemonsController = require("../controller/pokemons");
const authMiddleware = require("../config/auth");

router.post("/addData", authMiddleware, PokemonsController.addRecord);
router.get("/", authMiddleware, PokemonsController.getAllData);


module.exports = router;