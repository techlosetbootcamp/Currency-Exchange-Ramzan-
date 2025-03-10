import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Z5ASNND7PH9Zv6nodjyWIhFdbKTt3dcMdSSajX10`,
  timeout: 5000,
});