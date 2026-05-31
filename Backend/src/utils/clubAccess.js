const Club = require("../models/club.model");

const checkClubAccess = async (userId, clubId) => {
  const club = await Club.findById(clubId);

  if (!club) {
    return {
      allowed: false,
      status: 404,
      message: "Club not found"
    };
  }

  const userIdStr = userId.toString();
  const isCreator =
    club.createdBy.toString() === userIdStr;
  const isCoordinator = club.coordinators.some(
    (coordinator) =>
      coordinator.toString() === userIdStr
  );

  if (!isCreator && !isCoordinator) {
    return {
      allowed: false,
      status: 403,
      message: "Access denied"
    };
  }

  return { allowed: true, club };
};

const checkCreatorOnly = async (userId, clubId) => {

  const club = await Club.findById(clubId);

  if (!club) {

    return {
      allowed: false,
      status: 404,
      message: "Club not found"
    };

  }

  if (club.createdBy.toString() !== userId.toString()) {

    return {
      allowed: false,
      status: 403,
      message: "Only the club creator can edit or delete"
    };

  }

  return { allowed: true, club };

};

const checkClubMember = async (userId, clubId) => {
  const club = await Club.findById(clubId);

  if (!club) {
    return {
      allowed: false,
      status: 404,
      message: "Club not found"
    };
  }

  const userIdStr = userId.toString();
  const isMember = club.members.some(
    (member) => member.toString() === userIdStr
  );

  if (!isMember) {
    return {
      allowed: false,
      status: 403,
      message: "You must be a club member to perform this action"
    };
  }

  return { allowed: true, club };
};

const checkResourceOwner = (userId, resource) => {
  if (!resource.uploadedBy) {
    return {
      allowed: false,
      status: 403,
      message: "Only the resource creator can edit or delete"
    };
  }

  if (resource.uploadedBy.toString() !== userId.toString()) {
    return {
      allowed: false,
      status: 403,
      message: "Only the resource creator can edit or delete"
    };
  }

  return { allowed: true };
};

module.exports = {
  checkClubAccess,
  checkCreatorOnly,
  checkClubMember,
  checkResourceOwner
};
