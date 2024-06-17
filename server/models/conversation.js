import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time_sent: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  admin_id: {
    type: mongoose.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  messages: [MessageSchema],
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
