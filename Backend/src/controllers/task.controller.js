const Task = require(
  "../models/task.model"
);

const Club = require(
  "../models/club.model"
);

const { checkCreatorOnly } = require(
  "../utils/clubAccess"
);
const Notification = require(
  "../models/notification.model"
);

const {
  buildTaskNotifications,
  sendNotifications
} = require(
  "../utils/notificationHelper"
);

exports.createTask = async (req, res) => {

  try {

    const {

      title,

      description,

      deadline,

      assignedTo

    } = req.body;

    const task =
      await Task.create({

        title,

        description,

        deadline,

        assignedTo: assignedTo || [],

        club: req.params.clubId,

        createdBy: req.user.id

      });
  const club =
  await Club.findById(
    req.params.clubId
  );

if (!club) {

  return res.status(404).json({

    message: "Club not found"

  });

}

const notifications = buildTaskNotifications(
  club,
  task,
  req.user.id,
  `New task added in ${club.clubName}: ${title}`
);

await sendNotifications(req, notifications);
    res.status(201).json({

      success: true,

      task

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

exports.getClubTasks =
async (req, res) => {

  try {

    const tasks =
      await Task.find({

        club: req.params.clubId

      })

      .populate(
        "createdBy",
        "name email"
      )

      .populate(
        "assignedTo",
        "name email"
      )

      .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      tasks

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};
exports.getMyTasks =
async (req, res) => {

  try {

    const tasks =

      await Task.find({

        assignedTo:
          req.user.id

      })

      .populate(
        "createdBy",
        "name email"
      )

      .populate(
        "club",
        "clubName"
      )

      .sort({
        createdAt: -1
      });

    res.status(200).json({

      success: true,

      tasks

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};
exports.updateTaskStatus =
async (req, res) => {

  try {

    const task =
      await Task.findById(
        req.params.taskId
      );

    if (!task) {

      return res.status(404).json({

        message: "Task not found"

      });

    }

   const wasCompleted =
  task.status === "Completed";

task.status = req.body.status;

if (

  !wasCompleted &&

  req.body.status === "Completed"

) {

  const notification =
    await Notification.create({

      user: task.createdBy,

      message:
        `${req.user.name} completed: ${task.title}`

    });

  const io = req.app.get("io");

  io.to(
    task.createdBy.toString()
  ).emit(
    "new_notification",
    notification
  );

}
    await task.save();

    res.status(200).json({

      success: true,

      task

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

exports.updateTask = async (req, res) => {

  try {

    const task = await Task.findById(
      req.params.taskId
    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    const access = await checkCreatorOnly(
      req.user.id,
      task.club
    );

    if (!access.allowed) {

      return res.status(access.status).json({
        message: access.message
      });

    }

    const {
      title,
      description,
      deadline,
      assignedTo
    } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (deadline !== undefined) task.deadline = deadline;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;

    await task.save();

    res.status(200).json({
      success: true,
      task
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.deleteTask = async (req, res) => {

  try {

    const task = await Task.findById(
      req.params.taskId
    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    const access = await checkCreatorOnly(
      req.user.id,
      task.club
    );

    if (!access.allowed) {

      return res.status(access.status).json({
        message: access.message
      });

    }

    await Task.findByIdAndDelete(
      req.params.taskId
    );

    res.status(200).json({
      success: true,
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};