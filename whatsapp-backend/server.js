//importing
import express from "express";
import mongoose from "mongoose";
//app config
const app = express();
const port = process.env.PORT || 9000;

//middlewares

//DB config
const connection_url =
  "mongodb+srv://admin:swathi123456@cluster0.gsnapjw.mongodb.net/whatsappdb";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "whatsappdb"
});

//???

//api routes
app.get("/", (req, res) => res.status(200).send("Hello Universe"));

app.post('/api/v1messages/new')
//listener
app.listen(port, () => console.log(`listening on local host: ${port}`));
