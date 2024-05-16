const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Redis = require("redis");


const app = express();
const DEFAULT_EXPIRATION = 3600;
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.get("/", async(req, res) => {
 
  res.send("Hello world!");
});

(async () => {
    redisClient = Redis.createClient();
  
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
  
    await redisClient.connect();
    
  })();
app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;

  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos",
    { params: { albumId } }
  );
   redisClient.SETEX('photos',DEFAULT_EXPIRATION,JSON.stringify(data));
  res.send(data);
});



app.get("/photos/:id", async (req, res) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
  );
  res.json(data);
});

app.listen(4000, () => {
  console.log(`Listening on port 4000`);
});
