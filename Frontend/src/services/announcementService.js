import API from "./api";

export const createAnnouncement =
async (clubId, data) => {

  const response = await API.post(
    `/announcements/create/${clubId}`,
    data
  );

  return response.data;

};

export const getClubAnnouncements =
async (clubId) => {

  const response = await API.get(
    `/announcements/${clubId}`
  );

  return response.data;

};

export const updateAnnouncement =
async (announcementId, data) => {

  const response = await API.put(
    `/announcements/update/${announcementId}`,
    data
  );

  return response.data;

};

export const deleteAnnouncement =
async (announcementId) => {

  const response = await API.delete(
    `/announcements/delete/${announcementId}`
  );

  return response.data;

};
