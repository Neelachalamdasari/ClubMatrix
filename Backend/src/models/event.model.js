const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(

  {

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    venue: {
      type: String,
      required: true
    },
    poster: {
  type: String,
  default: ""
},

    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

  },

  {
    timestamps: true
  }

);

module.exports = mongoose.model(
  "Event",
  eventSchema
);