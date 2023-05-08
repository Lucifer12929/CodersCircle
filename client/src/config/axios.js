// create axios instance
import axios from "axios";
const apiurl = "http://localhost:8000/api";
const provider = axios.create({
  baseURL: apiurl,
});

export default provider;
