import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL_SR } from "@env";

const apiSR = axios.create({
  baseURL: API_BASE_URL_SR,
  headers: {
    "Content-Type": "application/json",
  },
});

apiSR.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiSR;
