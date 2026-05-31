import API from "./api";

export const createTask =
async (clubId, taskData) => {

  const response = await API.post(
    `/tasks/create/${clubId}`,
    taskData
  );

  return response.data;

};

export const getClubTasks =
async (clubId) => {

  const response = await API.get(
    `/tasks/${clubId}`
  );

  return response.data;

};

export const updateTask =
async (taskId, taskData) => {

  const response = await API.put(
    `/tasks/update/${taskId}`,
    taskData
  );

  return response.data;

};

export const updateTaskStatus =
async (taskId, status) => {

  const response = await API.put(
    `/tasks/status/${taskId}`,
    { status }
  );

  return response.data;

};

export const deleteTask =
async (taskId) => {

  const response = await API.delete(
    `/tasks/delete/${taskId}`
  );

  return response.data;

};
export const getMyTasks =
async () => {

  const response =
    await API.get(
      "/tasks/my"
    );

  return response.data;

};