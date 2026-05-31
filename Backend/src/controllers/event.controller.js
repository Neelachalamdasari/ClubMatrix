const Event = require(
  "../models/event.model"
);

const Club = require(
  "../models/club.model"
);

const { checkCreatorOnly } = require(
  "../utils/clubAccess"
);
const cloudinary = require(
  "../config/cloudinary"
);


exports.createEvent = async (req, res) => {

  try {

    const {

      title,

      description,

      date,

      venue

    } = req.body;
let posterUrl = "";

if (req.file) {

  const result =
    await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "clubmatrix/events"
      }
    );

  posterUrl = result.secure_url;
}
    const event =
      await Event.create({

        title,

        description,

        date,

        venue,

        club: req.params.clubId,

        createdBy: req.user.id,
        poster: posterUrl,

      });

   

    res.status(201).json({

      success: true,

      event

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

exports.getClubEvents =
async (req, res) => {

  try {

    const events =
      await Event.find({

        club: req.params.clubId

      })

      .populate(
        "createdBy",
        "name email"
      )

      .sort({ date: 1 });

    res.status(200).json({

      success: true,

      events

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(
      req.params.eventId
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const access = await checkCreatorOnly(
      req.user.id,
      event.club
    );

    if (!access.allowed) {
      return res.status(access.status).json({
        message: access.message
      });
    }

    const {
      title,
      description,
      date,
      venue
    } = req.body;

    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (venue) event.venue = venue;

    if (req.file) {
      const result =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "clubmatrix/events"
          }
        );

      event.poster = result.secure_url;
    }

    await event.save();

    res.status(200).json({
      success: true,
      event
    });

  } catch (error) {

    console.error(
      "UPDATE EVENT ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });
  }
};
exports.deleteEvent = async (req, res) => {

  try {

    const event = await Event.findById(
      req.params.eventId
    );

    if (!event) {

      return res.status(404).json({
        message: "Event not found"
      });

    }

    const access = await checkCreatorOnly(
      req.user.id,
      event.club
    );

    if (!access.allowed) {

      return res.status(access.status).json({
        message: access.message
      });

    }

    await Event.findByIdAndDelete(
      req.params.eventId
    );

    res.status(200).json({
      success: true,
      message: "Event deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
exports.getUpcomingEvents =
async (req, res) => {

  try {

    const clubs =
      await Club.find({

        members: req.user.id

      });

    const clubIds =
      clubs.map(
        club => club._id
      );

    const events =
      await Event.find({

        club: {
          $in: clubIds
        },

        date: {
          $gte: new Date()
        }

      })

      .populate(
        "club",
        "clubName"
      )

      .sort({
        date: 1
      });

    res.status(200).json({

      success: true,

      events

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};