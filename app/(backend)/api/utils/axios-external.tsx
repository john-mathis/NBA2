import axios from "axios";

const externalAPI = axios.create({
  baseURL: "https://sports-information.p.rapidapi.com/nba",
  headers: {
    "x-rapidapi-key": process.env.API_KEY,
    "x-rapidapi-host": process.env.API_HOST,
  },
  withCredentials: true,
});

externalAPI.interceptors.request.use(
  async (response) => response,
  async function onRejected(error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error || "Something went wrong";
    return Promise.reject({ status, message });
  }
);

externalAPI.interceptors.response.use(
  async (response) => response,
  async function onRejected(error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error || "Something went wrong";
    return Promise.reject({ status, message });
  }
);

export { externalAPI };
