const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(

  {

    text: {
      type: String,
      required: true
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
    }

  },

  {
    timestamps: true
  }

);

module.exports = mongoose.model(
  "Message",
  messageSchema
);