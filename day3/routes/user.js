const express = require('express');

const app = express.Router()

Router.get("/", (req, res) => {
    res.json(users);
    //   res.send(users)
  })


export default Router;