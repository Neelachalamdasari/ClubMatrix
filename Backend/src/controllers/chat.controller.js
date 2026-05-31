const Message = require(
  "../models/message.model"
);

exports.getClubMessages =
async (req, res) => {

  try {

    const messages =
      await Message.find({

        club: req.params.clubId

      })

      .populate(
        "sender",
        "name email"
      )

      .sort({ createdAt: 1 });

    res.status(200).json({

      success: true,

      messages

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};