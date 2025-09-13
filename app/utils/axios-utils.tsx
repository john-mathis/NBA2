import axios from "axios";

const client = axios.create({
  baseURL: "https://sports-information.p.rapidapi.com/nba",
});

export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = "Bearer token";
  const onSuccess = (response: any) => response;
  const onError = (error: []) => {
    // optionally catch errors

    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
