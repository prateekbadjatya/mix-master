import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
});
