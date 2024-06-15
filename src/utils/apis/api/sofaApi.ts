import axios from "axios";

const BASE_URL = "https://www.sofascore.com/api/v1/";
const sofaAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Cache-Control": "no-store",
  },
});

export default sofaAPI;
