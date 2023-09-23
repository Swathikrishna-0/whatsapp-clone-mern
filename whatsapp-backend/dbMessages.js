import mongoose from "mongoose";

const whatsapSchema = new mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
})

export default mongoose.model("whatsapp", whatsapSchema);

