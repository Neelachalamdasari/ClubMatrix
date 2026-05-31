const Announcement = require(
  "../models/announcement.model"
);

const Club = require(
  "../models/club.model"
);

const { checkCreatorOnly } = require(
  "../utils/clubAccess"
);

const {
  buildMemberNotifications,
  sendNotifications
} = require(
  "../utils/notificationHelper"
);

exports.createAnnouncement = async (req, res) => {

  try {

    const {

      title,

      content

    } = req.body;

    const club = await Club.findById(
      req.params.clubId
    );

    if (!club) {

      return res.status(404).json({
        message: "Club not found"
      });

    }

    const announcement =
      await Announcement.create({

        title,

        content,

        club: club._id,

        postedBy: req.user.id

      });

    const notifications = buildMemberNotifications(
      club,
      req.user.id,
      `New announcement in ${club.clubName}: ${title}`
    );

    await sendNotifications(req, notifications);

    res.status(201).json({

      success: true,

      announcement

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getClubAnnouncements = async (req, res) => {

  try {

    const announcements =
      await Announcement.find({

        club: req.params.clubId

      })

      .populate(
        "postedBy",
        "name email"
      )

      .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      announcements

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
exports.updateAnnouncement =
async (req, res) => {

  try {

    const announcement =
      await Announcement.findById(
        req.params.announcementId
      );

    if (!announcement) {

      return res.status(404).json({
        message: "Announcement not found"
      });

    }

    const access = await checkCreatorOnly(
      req.user.id,
      announcement.club
    );

    if (!access.allowed) {

      return res.status(access.status).json({
        message: access.message
      });

    }

    const { title, content } = req.body;

    if (title !== undefined) {
      announcement.title = title;
    }

    if (content !== undefined) {
      announcement.content = content;
    }

    await announcement.save();

    res.status(200).json({
      success: true,
      announcement
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.deleteAnnouncement =
async (req, res) => {

  try {

    const announcement =
      await Announcement.findById(
        req.params.announcementId
      );

    if (!announcement) {

      return res.status(404).json({
        message: "Announcement not found"
      });

    }

    const access = await checkCreatorOnly(
      req.user.id,
      announcement.club
    );

    if (!access.allowed) {

      return res.status(access.status).json({
        message: access.message
      });

    }

    await Announcement.findByIdAndDelete(
      req.params.announcementId
    );

    res.status(200).json({
      success: true,
      message: "Announcement deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};