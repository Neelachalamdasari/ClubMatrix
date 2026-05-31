import API from "./api";

export const createEvent =
async (clubId, eventData) => {

  const response = await API.post(
    `/events/create/${clubId}`,
    eventData
  );

  return response.data;

};

export const getClubEvents =
async (clubId) => {

  const response = await API.get(
    `/events/${clubId}`
  );

  return response.data;

};

export const updateEvent =
async (eventId, eventData) => {

  const response = await API.put(
    `/events/update/${eventId}`,
    eventData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data"
      }
    }
  );

  return response.data;
};

export const deleteEvent =
async (eventId) => {

  const response = await API.delete(
    `/events/delete/${eventId}`
  );

  return response.data;

};
export const getUpcomingEvents =
async () => {

  const response =
    await API.get(
      "/events/upcoming/all"
    );

  return response.data;

};