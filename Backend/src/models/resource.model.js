const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(

  {

    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    fileUrl: {
  type: String,
  required: true
},

fileType: {
  type: String,
  default: ""
},

    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

  },

  {
    timestamps: true
  }

);

module.exports = mongoose.model(
  "Resource",
  resourceSchema
);