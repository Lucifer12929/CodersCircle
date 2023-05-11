// create axios instance
import axios from "axios";
const apiurl = "/api";
const provider = axios.create({
  baseURL: apiurl,
});

export default provider;
