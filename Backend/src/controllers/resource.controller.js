const Resource = require(
  "../models/resource.model"
);

const {
  checkClubMember,
  checkResourceOwner
} = require(
  "../utils/clubAccess"
);

const cloudinary = require(
  "../config/cloudinary"
);
exports.createResource =
async (req, res) => {

  try {

    const access =
      await checkClubMember(
        req.user.id,
        req.params.clubId
      );

    if (!access.allowed) {

      return res.status(
        access.status
      ).json({
        message: access.message
      });

    }

    if (!req.file) {

      return res.status(400).json({
        message: "File required"
      });

    }

    const result =
      await cloudinary.uploader.upload(
        req.file.path,
        {
          folder:
            "clubmatrix/resources",
          resource_type: "auto"
        }
      );

    const resource =
      await Resource.create({

        title: req.body.title,

        description:
          req.body.description,

        fileUrl:
          result.secure_url,

        fileType:
          result.resource_type,

        club:
          req.params.clubId,

        uploadedBy:
          req.user.id

      });

    const populated =
      await Resource.findById(
        resource._id
      )
      .populate(
        "uploadedBy",
        "name email"
      );

    res.status(201).json({

      success: true,

      resource: populated

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
exports.updateResource = async (req, res) => {

  try {

    const resource = await Resource.findById(
      req.params.resourceId
    );

    if (!resource) {

      return res.status(404).json({
        message: "Resource not found"
      });

    }

    const access = checkResourceOwner(
      req.user.id,
      resource
    );

    if (!access.allowed) {

      return res.status(access.status).json({
        message: access.message
      });

    }

    const { title, description} = req.body;

    if (title !== undefined) resource.title = title;
    if (description !== undefined) resource.description = description;
  
    await resource.save();

    const populated = await Resource.findById(resource._id)
      .populate("uploadedBy", "name email");

    res.status(200).json({
      success: true,
      resource: populated
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.deleteResource = async (req, res) => {

  try {

    const resource = await Resource.findById(
      req.params.resourceId
    );

    if (!resource) {

      return res.status(404).json({
        message: "Resource not found"
      });

    }

    const access = checkResourceOwner(
      req.user.id,
      resource
    );

    if (!access.allowed) {

      return res.status(access.status).json({
        message: access.message
      });

    }

    await Resource.findByIdAndDelete(
      req.params.resourceId
    );

    res.status(200).json({
      success: true,
      message: "Resource deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getClubResources =
async (req, res) => {

  try {

    const resources =
      await Resource.find({

        club: req.params.clubId

      })

      .populate(
        "uploadedBy",
        "name email"
      )

      .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      resources

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};
