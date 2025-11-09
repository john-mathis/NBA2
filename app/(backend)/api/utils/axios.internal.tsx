// "use client";
import axios from "axios";

const internalAPI = axios.create({
  withCredentials: true,
});

internalAPI.interceptors.response.use(
  async (response) => response,
  async function (error) {
    // console.log("401 Internal response");
    const originalRequest = error.config;

    if (error.config.url.includes("/refreshToken")) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await internalAPI.post("/api/refreshToken");
      return internalAPI(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default internalAPI;
