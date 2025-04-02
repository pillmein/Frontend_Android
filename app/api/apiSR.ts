import axios from "axios";
import { API_BASE_URL_SR, ACCESS_TOKEN } from "@env";

const apiSR = axios.create({
  baseURL: API_BASE_URL_SR,
  headers: {
    "Authorization": `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default apiSR;
