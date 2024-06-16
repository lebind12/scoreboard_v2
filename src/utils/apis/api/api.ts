import axios from "axios";

const BASE_URL =
  "http://ec2-43-201-16-27.ap-northeast-2.compute.amazonaws.com:8000/api";
const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default API;
