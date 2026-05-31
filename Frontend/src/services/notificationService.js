import API from "./api";



export const getNotifications =
async () => {

  const response = await API.get(
    "/notifications"
  );

  return response.data;

};

// MARK READ

export const markAsRead =
async (notificationId) => {

  const response = await API.put(

    `/notifications/read/${notificationId}`

  );

  return response.data;

};