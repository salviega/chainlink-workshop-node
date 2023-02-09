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

  let buf = Buffer.from(JSON.stringify(pokemonNft), "base64");
  buf = buf.toString("base64");

  let metadata = { uri: `data:application/json;base64,${buf}`, id: idRamdom };

  res.set("Access-Control-Allow-Origin", "*");
  res.send(metadata);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🎈`);
});
