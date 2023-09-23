//importing
import express from "express";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middlewares

//DB config

//???

//api routes
app.get("/", (req, res) => res.status(200).send("Hello world"));

//listener
app.listen(port, () => console.log(`listening on local host: ${port}`));