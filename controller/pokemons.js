const Pokemons = require("../models/pokemons");



module.exports = {
    async addRecord(req, res) {
        try {
          const pokemons = new Pokemons({ ...req.body});
        //   console.log("pokemons",pokemons)
          newPokemons = await pokemons.save();
          res.status(201).send(newPokemons);
        } catch {
          res.status(500).send("Internal Server Error");
        }
      },

     async getAllData(req, res) {
        try {
          const pokemons = await Pokemons.find({})

            // console.log("pokemonsvfvf",pokemons)
          res.status(200).send(pokemons);
        } catch (err) {
          res.status(500).send("Internal Server Error");
        }
      },
 
  
  

  
  
};