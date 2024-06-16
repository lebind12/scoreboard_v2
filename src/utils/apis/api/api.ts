import axios from "axios";

const BASE_URL = "https://makeyourpage.net/api";
const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default API;
