import API from "./api";

export const getClubMessages =
async (clubId) => {

  const response = await API.get(
    `/chat/${clubId}`
  );

  return response.data;

};