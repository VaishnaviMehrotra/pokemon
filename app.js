const express = require('express');
const cors = require("cors");
const dbInit = require("./config/db");
// const helmet = require("helmet");
const path = require("path")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


// app.use("/images",express.static(path.join(__dirname,"public","images")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use(helmet({ contentSecurityPolicy: false }));

dbInit();

const userRoutes = require("./routes/user");
const pokemonsRoutes = require("./routes/pokemons");

app.use("/api/user", userRoutes);
app.use("/api/pokemons", pokemonsRoutes);


app.listen(PORT, ()=>{console.log(`listening to PORT ${PORT}`)});

