import axios from "axios";
import { API_BASE_URL_SO, ACCESS_TOKEN } from "@env";

const apiSO = axios.create({
  baseURL: API_BASE_URL_SO,
  headers: {
    "Authorization": `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default apiSO;
