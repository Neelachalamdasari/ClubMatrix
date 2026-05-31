import API from "./api";

export const askAssistant =
async (prompt) => {

  const response = await API.post(

    "/ai/ask",

    { prompt }

  );

  return response.data;

};