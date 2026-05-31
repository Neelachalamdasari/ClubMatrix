import API from "./api";
export const getClubResources = async (clubId) => {
  const response = await API.get(`/resources/${clubId}`);
  return response.data;
};
export const createResource = async (clubId, resourceFormData) => {
  const response = await API.post(`/resources/create/${clubId}`, resourceFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const updateResource = async (resourceId, resourceData) => {
  const response = await API.put(`/resources/update/${resourceId}`, resourceData);
  return response.data;
};
export const deleteResource = async (resourceId) => {
  const response = await API.delete(`/resources/delete/${resourceId}`);
  return response.data;
};