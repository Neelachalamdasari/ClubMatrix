const Notification = require(
  "../models/notification.model"
);


exports.getNotifications =
async (req, res) => {

  try {

    const notifications =
      await Notification.find({

        user: req.user.id

      })

      .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      notifications

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

// MARK AS READ

exports.markAsRead =
async (req, res) => {

  try {

    const notification =
      await Notification.findById(
        req.params.notificationId
      );

    if (!notification) {

      return res.status(404).json({

        message:
          "Notification not found"

      });

    }

    notification.read = true;

    await notification.save();

    res.status(200).json({

      success: true,

      notification

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};