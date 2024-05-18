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

  app.get('/photos', async (req, res) => {
      const albumId = req.query.albumId;
      const cacheKey = `photos:${albumId}`; // Use a unique key for each albumId
  
      redisClient.get(cacheKey, async (error, reply) => {
          if (error) {
              console.error('Redis error:', error);
              return res.status(500).send('Internal Server Error');
          }
          
          if (reply != null) {
              console.log("Cache hit");
              return res.json(JSON.parse(reply));
          } else {
              console.log("Cache miss");
              try {
                  const { data } = await axios.get(
                      "https://jsonplaceholder.typicode.com/photos",
                      { params: { albumId } }
                  );
                  redisClient.setex(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(data));
                  return res.json(data);
              } catch (apiError) {
                  console.error('API error:', apiError);
                  return res.status(500).send('Failed to fetch data from the API');
              }
          }
      });
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
