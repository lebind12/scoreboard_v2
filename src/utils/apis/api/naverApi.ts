import axios from "axios";

const NAVER_URL = "https://api-gw.sports.naver.com/schedule/games/";
const naverAPI = axios.create({
  baseURL: NAVER_URL,
  timeout: 10000,
  headers: {
    "Cache-Control": "no-store",
  },
});

export default naverAPI;
