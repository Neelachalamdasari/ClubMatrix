const Club = require(
  "../models/club.model"
);

const coordinatorOnly =
async (req, res, next) => {

  try {

    const club =
      await Club.findById(
        req.params.clubId
      );

    if (!club) {

      return res.status(404).json({

        message: "Club not found"

      });

    }

    // CHECK CREATOR

    const isCreator =

      club.createdBy.toString()
      === req.user.id;

    // CHECK COORDINATOR

    const isCoordinator =

      club.coordinators.some(

        (coordinator) =>

          coordinator.toString()
          === req.user.id

      );

    if (

      !isCreator &&
      !isCoordinator

    ) {

      return res.status(403).json({

        message:
          "Access denied"

      });

    }

    next();

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

module.exports = {

  coordinatorOnly

};







 
       