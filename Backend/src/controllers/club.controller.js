const Club = require("../models/club.model");

const User = require("../models/user.model");

const cloudinary = require("../config/cloudinary");
exports.createClub = async (req, res) => {

  try {

    const {
      clubName,
      description,
      category
    } = req.body;

    const existingClub = await Club.findOne({
      clubName
    });

    if (existingClub) {

      return res.status(400).json({
        message: "Club already exists"
      });

    }
let imageUrl = "";

if (req.file) {

  const result =
    await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "clubmatrix/clubs"
      }
    );

  imageUrl = result.secure_url;
}
    const club = await Club.create({

  clubName,
  description,
  category,

  clubImage: imageUrl,

  createdBy: req.user.id,

  coordinators: [req.user.id],

  members: [req.user.id]

});
    await User.findByIdAndUpdate(

      req.user.id,

      {
        $push: {
          joinedClubs: club._id
        }
      }

    );

    res.status(201).json({

      success: true,

      club

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getAllClubs = async (req, res) => {

  try {

    const clubs = await Club.find()
      .populate("members", "name email")
      .populate("coordinators", "name email");

    res.status(200).json({

      success: true,

      clubs

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
exports.getSingleClub = async (req, res) => {

  try {

    const club = await Club.findById(
      req.params.clubId
    )

    .populate("members", "name email")

    .populate("coordinators", "name email")

    .populate("createdBy", "name email");

    if (!club) {

      return res.status(404).json({
        message: "Club not found"
      });

    }

    res.status(200).json({

      success: true,

      club

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.joinClub = async (req, res) => {

  try {

    const club = await Club.findById(
      req.params.clubId
    );

    if (!club) {

      return res.status(404).json({
        message: "Club not found"
      });

    }

    const alreadyJoined = club.members.includes(
      req.user.id
    );

    if (alreadyJoined) {

      return res.status(400).json({
        message: "Already joined club"
      });

    }

    club.members.push(req.user.id);

    await club.save();

    await User.findByIdAndUpdate(

      req.user.id,

      {
        $push: {
          joinedClubs: club._id
        }
      }

    );

    res.status(200).json({

      success: true,

      message: "Club joined successfully"

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getJoinedClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ members: req.user.id })
      .populate("members", "name email")
      .populate("coordinators", "name email");

    res.status(200).json({
      success: true,
      clubs
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
