//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
//app config
const app = express();
const port = process.env.PORT || 9000;

//middlewares

//DB config
const connection_url =
  "mongodb+srv://admin:swathimadhu123@cluster0.gsnapjw.mongodb.net/whatsappdb";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "whatsappdb",
});

//???

//api routes
app.get("/", (req, res) => res.status(200).send("Hello Universe"));

app.post('/messages/new',(req,res)=>{
  const dbMessage = req.body;

  Messages.create(dbMessage,(err,data)=>{
    if (err){
      res.status(500).send(err)
    }else{
      res.status(201).send(data)
    }
  })
})

//listener
app.listen(port, () => console.log(`listening on local host: ${port}`));
