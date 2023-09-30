//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from 'cors';
//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1678781",
  key: "a942192b0894c3f75ab7",
  secret: "a06761f02a10be8f8f65",
  cluster: "ap2",
  useTLS: true,
});

//middlewares
app.use(express.json());
app.use(cors())

// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","*");
//   res.setHeader("Access-Control-Allow_Headers","*");
//   next();
// });

//DB config
const connection_url =
  "mongodb+srv://admin:swathimadhu123@cluster0.gsnapjw.mongodb.net/whatsappdb";
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "whatsappdb",
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//???
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB is connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log("A change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received:true
      });
    }
    else{
      console.log('Error triggering Pusher')
    }
  });
});

//api routes
app.get("/", (req, res) => res.status(200).send("Hello Universe"));

// app.post("/messages/new", (req, res) => {
//   const dbMessage = req.body;

//   Messages.create(dbMessage, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// });
app.get("/messages/sync", async (req, res) => {
  try {
    const data = await Messages.find();
    res.status(200).send(data);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).send(err);
  }
});

// app.get("/messages/sync", (req, res) => {
//   Messages.find((err, data) => {
//     if (err) {
//       console.error("Error retrieving data:", err);
//       res.status(500).send(err);
//     } else {
//       console.log("Data retrieved successfully:", data);
//       res.status(200).send(data);
//     }
//   });
// });

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//listener
app.listen(port, () => console.log(`listening on local host: ${port}`));
