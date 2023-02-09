import axios from "axios";
import cors from "cors";
import express from "express";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/getPokemon", async (req, res) => {
  const { query } = req;
  const idRamdom = query.idRamdom;

  let pokemonNft = {
    name: "",
    description: "Chainlink AnyAPIs 😍",
    image: "",
    attributes: [],
  };

  const pokeAPI = `https://pokeapi.co/api/v2/pokemon/${idRamdom}/`;

  const response = await axios.get(pokeAPI);
  const data = response.data;

  pokemonNft.name = data.name;
  pokemonNft.image = data.sprites.front_default;

  data.types.map((type) => {
    pokemonNft.attributes.push({
      trait_type: "Base",
      value: type.type.name,
    });
  });

  pokemonNft = { ...pokemonNft };

  res.set("Access-Control-Allow-Origin", "*");
  res.send(pokemonNft);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🎈`);
});
