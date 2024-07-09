// create axios instance
import axios from "axios";
const apiurl = "https://backendcoders.onrender.com/api";
const provider = axios.create({
  baseURL: apiurl,
});

export default provider;
