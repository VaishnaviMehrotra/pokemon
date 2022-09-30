const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonsSchema = new Schema(
    {
        // user: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User"
        // },
        name: {
            type: String
        },
        image: {
            type: String
        },
        abilities: [{
            name:String,
        }
       ],
        attacks: [{
            name:String,
            convertedEnergyCost:Number,
            text:String

        }
       ],
       
    },
    {timestamps: true},
)

const Pokemons = mongoose.model("Pokemons", pokemonsSchema );
module.exports = Pokemons;