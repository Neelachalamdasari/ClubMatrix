const Message = require(
  "../models/message.model"
);

module.exports = (io) => {

  io.on("connection", (socket) => {

    console.log(
      "User Connected:",
      socket.id
    );

    socket.on(

      "join_user",

      (userId) => {

        socket.join(userId);

        console.log(

          "User joined personal room:",

          userId

        );

      }

    );

    socket.on(

      "join_club",

      (clubId) => {

        socket.join(clubId);

        console.log(

          "User joined club room:",

          clubId

        );

      }

    );

    socket.on(

      "send_message",

      async (data) => {

        try {

          const {

            text,

            sender,

            club

          } = data;

          const message = await Message.create({

            text,

            sender,

            club

          });

          const populatedMessage =
            await Message.findById(message._id)
              .populate("sender", "name email");

          io.to(club).emit(

            "receive_message",

            populatedMessage

          );

        } catch (error) {

          console.log(error);

        }

      }

    );

    socket.on(

      "disconnect",

      () => {

        console.log(
          "User Disconnected"
        );

      }

    );

  });

};
