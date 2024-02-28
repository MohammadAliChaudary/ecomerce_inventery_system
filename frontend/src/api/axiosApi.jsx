import axios from "axios";
const BASE_URL = "http://localhost:5500";
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
