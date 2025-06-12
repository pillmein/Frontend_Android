import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL_SO } from "@env";

const apiSO = axios.create({
  baseURL: API_BASE_URL_SO,
  headers: {
    "Content-Type": "application/json",
  },
});

apiSO.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiSO;
