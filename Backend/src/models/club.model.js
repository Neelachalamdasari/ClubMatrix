const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(

  {

    clubName: {
      type: String,
      required: true,
      unique: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      default: "General"
    },

    clubImage: {
      type: String,
      default: ""
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    coordinators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]

  },

  {
    timestamps: true
  }

);

module.exports = mongoose.model(
  "Club",
  clubSchema
);