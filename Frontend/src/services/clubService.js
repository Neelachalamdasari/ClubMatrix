import API from "./api";

export const createClub = async (clubData) => {

  const response = await API.post(

    "/clubs/create",

    clubData

  );

  return response.data;

};
export const getAllClubs = async () => {

  const response = await API.get(
    "/clubs/all"
  );

  return response.data;

};

export const getSingleClub = async (clubId) => {

  const response = await API.get(
    `/clubs/${clubId}`
  );

  return response.data;

};
export const joinClub = async (clubId) => {

  const response = await API.put(
    `/clubs/join/${clubId}`
  );

  return response.data;

};

export const getJoinedClubs = async () => {
  const response = await API.get("/clubs/joined");
  return response.data;
};