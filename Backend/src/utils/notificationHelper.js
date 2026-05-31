const Notification = require(
  "../models/notification.model"
);

const buildMemberNotifications = (
  club,
  actorId,
  message
) => {

  const actorIdStr = actorId.toString();

  return (club.members || [])

    .filter(
      (member) =>
        member.toString() !== actorIdStr
    )

    .map((member) => ({

      user: member,

      message

    }));

};

const buildTaskNotifications = (
  club,
  task,
  actorId,
  message
) => {

  const actorIdStr = actorId.toString();

  const recipients =
    task.assignedTo?.length
      ? task.assignedTo
      : club.members || [];

  return recipients

    .filter(
      (member) =>
        member.toString() !== actorIdStr
    )

    .map((member) => ({

      user: member,

      message

    }));

};

const sendNotifications = async (
  req,
  notifications
) => {

  if (!notifications.length) {
    return;
  }

  await Notification.insertMany(notifications);

  const io = req.app.get("io");

  notifications.forEach((notification) => {

    io.to(
      notification.user.toString()
    ).emit(
      "new_notification",
      notification
    );

  });

};

module.exports = {
  buildMemberNotifications,
  buildTaskNotifications,
  sendNotifications
};
