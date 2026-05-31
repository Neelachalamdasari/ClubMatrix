const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(

  {

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    deadline: {
      type: Date
    },

    status: {
      type: String,
      enum: [

        "Pending",

        "In Progress",

        "Completed"

      ],
      default: "Pending"
    },

    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    assignedTo: [
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
  "Task",
  taskSchema

  
);